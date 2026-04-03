<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Incident;
use App\Models\Cat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class IncidentController extends Controller
{
    public function index()
    {
        return response()->json(Incident::orderBy('reported_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'description' => 'required|string',
            'cat_id' => 'nullable|string', // Could be string like CAT-492, we can parse it
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'photo' => 'nullable|image|max:10240'
        ]);

        $photoUrl = null;
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('incidents', 'public');
            $photoUrl = Storage::url($path);
        }

        // Try to match cat ID if provided
        $realCatId = null;
        if (!empty($validated['cat_id'])) {
            $parsedId = (int) str_replace(['#CAT-', 'CAT-'], '', $validated['cat_id']);
            if (Cat::find($parsedId)) {
                $realCatId = $parsedId;
            }
        }

        $incident = Incident::create([
            'type' => $validated['type'],
            'description' => $validated['description'],
            'cat_id' => $realCatId,
            'reporter_user_id' => auth()->check() ? auth()->id() : null,
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'photo_url' => $photoUrl,
            'status' => 'Pending',
            'severity' => 'Medium'
        ]);

        return response()->json([
            'message' => 'Report submitted successfully.',
            'incident' => $incident
        ], 201);
    }
}
