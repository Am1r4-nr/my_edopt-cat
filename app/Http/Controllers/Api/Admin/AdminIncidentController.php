<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Incident;
use Illuminate\Http\Request;

class AdminIncidentController extends Controller
{
    public function index(Request $request)
    {
        $query = Incident::with(['cat', 'reporter'])->orderBy('reported_at', 'desc');

        if ($request->has('type') && $request->type !== 'All Types') {
            $query->where('type', $request->type);
        }

        if ($request->has('status') && $request->status !== 'All Statuses') {
            $query->where('status', $request->status);
        }

        if ($request->has('q') && $request->q !== '') {
            $query->where('type', 'like', "%{$request->q}%")
                ->orWhereHas('cat', function($q) use ($request) {
                    $q->where('name', 'like', "%{$request->q}%");
                });
        }

        $incidents = $query->get()->map(function ($inc) {
            return [
                'id' => $inc->id,
                'type' => $inc->type,
                'cat_id' => $inc->cat_id ? '#CAT-' . str_pad($inc->cat_id, 4, '0', STR_PAD_LEFT) : '#CAT-NEW',
                'cat_name' => $inc->cat ? $inc->cat->name : 'Unknown/New',
                'location_desc' => 'Lat: ' . round($inc->latitude, 4) . ', Lng: ' . round($inc->longitude, 4),
                'latitude' => $inc->latitude,
                'longitude' => $inc->longitude,
                'reporter_name' => $inc->reporter ? $inc->reporter->name : 'Anonymous',
                'status' => $inc->status,
                'time_ago' => $inc->reported_at ? $inc->reported_at->diffForHumans() : 'Unknown',
                'time_spotted' => $inc->reported_at ? $inc->reported_at->format('h:i A') : '',
                'severity' => $inc->severity,
                'description' => $inc->description,
                'photo_url' => $inc->photo_url,
            ];
        });

        return response()->json($incidents);
    }

    public function markInProgress(Incident $incident)
    {
        $incident->update(['status' => 'In Progress']);
        return response()->json(['message' => 'Status updated', 'status' => $incident->status]);
    }

    public function markResolved(Incident $incident)
    {
        $incident->update(['status' => 'Resolved']);
        return response()->json(['message' => 'Status updated', 'status' => $incident->status]);
    }
}
