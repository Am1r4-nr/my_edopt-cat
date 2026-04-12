<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cat;
use Illuminate\Http\Request;

class CatController extends Controller
{
    public function index(Request $request)
    {
        $query = Cat::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('breed', 'like', "%{$search}%");
            });
        }

        if ($request->has('status') && $request->input('status') !== 'All') {
            $query->where('status', $request->input('status'));
        }

        return response()->json($query->orderBy('created_at', 'desc')->get());
    }

    public function show($id)
    {
        return response()->json(Cat::findOrFail($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'breed' => 'nullable|string|max:255',
            'age' => 'nullable|string|max:255',
            'sex' => 'nullable|string|max:255',
            'status' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'risk_score' => 'integer|min:0|max:100',
            'intake_date' => 'nullable|date',
            'image_url' => 'nullable|string',
        ]);

        $cat = Cat::create($validated);

        return response()->json($cat, 201);
    }

    public function update(Request $request, $id)
    {
        $cat = Cat::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'breed' => 'nullable|string|max:255',
            'age' => 'nullable|string|max:255',
            'sex' => 'nullable|string|max:255',
            'status' => 'sometimes|required|string|max:255',
            'location' => 'nullable|string|max:255',
            'risk_score' => 'integer|min:0|max:100',
            'intake_date' => 'nullable|date',
            'image_url' => 'nullable|string',
        ]);

        $cat->update($validated);

        return response()->json($cat);
    }

    public function destroy($id)
    {
        $cat = Cat::findOrFail($id);
        $cat->delete();

        return response()->json(null, 204);
    }

    public function generateTemperamentScore($id)
    {
        $cat = Cat::findOrFail($id);

        $context = "Cat Name: {$cat->name}. " . 
                   "Medical History: {$cat->medical_notes}. " . 
                   "Behavior observed by rescuer: {$cat->behavior_notes}.";

        $promptData = [
            "You are a professional animal behaviorist. 
             Analyze the provided photo and text to give a 'Temperament Score' from 1 to 10 
             (1 = aggressive/fearful, 10 = extremely friendly). 
             Return your answer in JSON format with two keys: 'score' and 'summary'.",
            $context
        ];

        if ($cat->image_url) {
            $imagePath = storage_path('app/public/' . str_replace('storage/', '', $cat->image_url));
            if (file_exists($imagePath)) {
                $promptData[] = new \Gemini\Data\Blob(
                    mimeType: \Gemini\Enums\MimeType::IMAGE_JPEG,
                    data: base64_encode(file_get_contents($imagePath))
                );
            }
        }
        
        $result = \Gemini\Laravel\Facades\Gemini::geminiProVision()->generateContent($promptData);

        $aiResponse = json_decode($result->text(), true);
        
        $cat->update([
            'temperament_score' => $aiResponse['score'] ?? null,
            'ai_description' => $aiResponse['summary'] ?? null
        ]);

        return response()->json([
            'message' => 'AI Profiling complete!',
            'cat' => $cat
        ]);
    }
}
