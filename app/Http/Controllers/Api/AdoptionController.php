<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Adoption;
use Illuminate\Http\Request;

class AdoptionController extends Controller
{
    public function index()
    {
        $adoptions = Adoption::with('cat')->orderBy('created_at', 'desc')->get()->map(function ($adoption) {
            return [
                'id' => $adoption->id,
                'applicant' => $adoption->applicant_name,
                'catName' => $adoption->cat ? $adoption->cat->name : 'Unknown',
                'date' => $adoption->application_date,
                'status' => $adoption->status,
                'stage' => $adoption->stage,
                'matchScore' => $adoption->match_score,
                'completedTasks' => $adoption->completed_tasks ?? [],
            ];
        });

        return response()->json($adoptions);
    }

    public function show($id)
    {
        $adoption = Adoption::with('cat')->findOrFail($id);
        return response()->json($adoption);
    }

    public function update(Request $request, $id)
    {
        $adoption = Adoption::findOrFail($id);

        $validated = $request->validate([
            'stage' => 'sometimes|integer|min:1|max:4',
            'status' => 'sometimes|string',
            'applicant_name' => 'sometimes|string',
            'match_score' => 'sometimes|integer',
            'completed_tasks' => 'sometimes|array',
        ]);

        $adoption->update($validated);

        return response()->json($adoption);
    }
}
