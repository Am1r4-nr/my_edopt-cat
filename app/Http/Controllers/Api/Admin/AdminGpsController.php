<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cat;
use App\Models\GpsLocation;
use Illuminate\Http\Request;

class AdminGpsController extends Controller
{
    public function index()
    {
        // Return cats with their latest GPS location
        $cats = Cat::with(['gpsLocations' => function($q) {
            $q->latest()->take(1);
        }])->get();

        $onlineCats = $cats->filter(function($cat) {
            return $cat->gpsLocations->isNotEmpty();
        })->map(function($cat) {
            $loc = $cat->gpsLocations->first();
            return [
                'id' => $cat->id,
                'cat_id_formatted' => '#CAT-' . str_pad($cat->id, 4, '0', STR_PAD_LEFT),
                'name' => $cat->name,
                'image_url' => $cat->image_url,
                'latitude' => $loc->latitude,
                'longitude' => $loc->longitude,
                'last_seen' => $loc->created_at->diffForHumans(),
                'battery' => rand(20, 100) > 30 ? 'NORMAL' : 'HIGH BATTERY' // Simulated telemetry
            ];
        });

        return response()->json([
            'cats' => array_values($onlineCats->toArray()),
            'stats' => [
                'online' => $onlineCats->count(),
                'pending_alerts' => \App\Models\Incident::where('status', 'Pending')->count(),
            ]
        ]);
    }

    public function log(Request $request)
    {
        $validated = $request->validate([
            'cat_id' => 'required|exists:cats,id',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'notes' => 'nullable|string',
            'status_flag' => 'nullable|string'
        ]);

        $gps = GpsLocation::create([
            'cat_id' => $validated['cat_id'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'logged_by_user_id' => auth()->id(),
            'method' => 'Admin Dashboard'
        ]);

        // If status flag indicates a problem, we could auto-create an incident here
        if (in_array($validated['status_flag'], ['Missing', 'Medical Need'])) {
            \App\Models\Incident::create([
                'type' => $validated['status_flag'] === 'Missing' ? 'Missing' : 'Injured',
                'cat_id' => $validated['cat_id'],
                'reporter_user_id' => auth()->id(),
                'description' => $validated['notes'] ?? 'Auto-generated via GPS log',
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'status' => 'Pending'
            ]);
        }

        return response()->json(['message' => 'Logged successfully'], 201);
    }
}
