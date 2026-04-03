<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Volunteer;
use App\Models\VolunteerActivity;
use Illuminate\Http\Request;

class VolunteerController extends Controller
{
    /**
     * Submit a new volunteer application
     */
    public function apply(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|string',
            'skills' => 'required|string',
            'availability' => 'required|array',
            'preferred_shift' => 'required|string',
        ]);

        $volunteer = Volunteer::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'phone' => $validated['phone'],
                'skills' => $validated['skills'],
                'availability' => $validated['availability'],
                'preferred_shift' => $validated['preferred_shift'],
                'status' => 'pending',
                'applied_at' => now(),
            ]
        );

        return response()->json(['message' => 'Your application is under review.', 'volunteer' => $volunteer]);
    }

    /**
     * Get dashboard stats for approved volunteer
     */
    public function dashboard()
    {
        $volunteer = Volunteer::where('user_id', auth()->id())->first();

        if (!$volunteer || $volunteer->status !== 'approved') {
            return response()->json(['error' => 'Not an approved volunteer.'], 403);
        }

        $activities = $volunteer->activities()->orderBy('activity_date', 'desc')->get();
        $totalHours = $volunteer->activities()->sum('hours_logged');
        $sessionsCount = $volunteer->activities()->count();

        return response()->json([
            'volunteer' => $volunteer,
            'total_hours' => $totalHours,
            'sessions' => $sessionsCount,
            'activities' => $activities
        ]);
    }

    /**
     * Log a new activity for the volunteer
     */
    public function logActivity(Request $request)
    {
        $validated = $request->validate([
            'activity_name' => 'required|string',
            'description' => 'required|string',
            'activity_date' => 'required|date',
            'hours_logged' => 'required|numeric|min:0.5',
        ]);

        $volunteer = Volunteer::where('user_id', auth()->id())->where('status', 'approved')->firstOrFail();

        $activity = $volunteer->activities()->create([
            'activity_name' => $validated['activity_name'],
            'description' => $validated['description'],
            'activity_date' => $validated['activity_date'],
            'hours_logged' => $validated['hours_logged'],
        ]);

        return response()->json(['message' => 'Activity logged successfully.', 'activity' => $activity]);
    }
}
