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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cat_id' => 'required|exists:cats,id',
            'applicant_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'housing_type' => 'required|string',
            'has_pets' => 'boolean',
            'reason' => 'required|string',
        ]);

        $adoption = Adoption::create([
            ...$validated,
            'user_id' => $request->user() ? $request->user()->id : null,
            'application_date' => now(),
            'status' => 'New Application',
            'stage' => 1,
            'match_score' => rand(70, 99), // Mock score for now
        ]);

        return response()->json($adoption, 201);
    }

    public function getUserAdoptions(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json([], 401);
        }

        $adoptions = Adoption::where('user_id', $user->id)
            ->with('cat')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($adoptions);
    }
}
