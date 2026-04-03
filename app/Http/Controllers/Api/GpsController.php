<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cat;
use Illuminate\Http\Request;

class GpsController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->query('q');
        if (!$query) {
            return response()->json([]);
        }

        // Match name or id (CAT-xxx)
        $parsedId = (int) str_replace(['#CAT-', 'CAT-'], '', $query);

        $cats = Cat::where('name', 'like', "%{$query}%")
            ->orWhere('id', $parsedId)
            ->with(['gpsLocations' => function($q) {
                $q->latest()->take(1);
            }])
            ->get();

        $results = $cats->filter(function($cat) {
            return $cat->gpsLocations->isNotEmpty();
        })->map(function($cat) {
            $loc = $cat->gpsLocations->first();
            return [
                'cat_id' => $cat->id,
                'name' => $cat->name,
                'image_url' => $cat->image_url,
                'latitude' => $loc->latitude,
                'longitude' => $loc->longitude,
                'timestamp' => $loc->created_at,
            ];
        });

        return response()->json(array_values($results->toArray()));
    }
}
