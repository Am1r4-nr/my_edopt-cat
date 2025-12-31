<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Incident;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    public function index()
    {
        $incidents = Incident::orderBy('reported_at', 'desc')->get();

        $data = $incidents->map(function ($incident) {
            return [
                'id' => $incident->id,
                'type' => $incident->type,
                'location' => [$incident->latitude, $incident->longitude],
                'severity' => $incident->severity,
                'description' => $incident->description,
                'time' => $incident->reported_at, // Format could be adjusted here if needed
                'status' => $incident->status
            ];
        });

        return response()->json($data);
    }
}
