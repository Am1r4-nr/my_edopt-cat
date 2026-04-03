<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Volunteer;
use App\Models\VolunteerActivity;
use App\Mail\VolunteerApproved;
use App\Mail\VolunteerRejected;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class VolunteerAdminController extends Controller
{
    /**
     * List all volunteers and pipeline metrics
     */
    public function index()
    {
        $volunteers = Volunteer::with('user')->orderBy('applied_at', 'desc')->get();
        
        $metrics = [
            'total_applications' => $volunteers->count(),
            'pending' => $volunteers->where('status', 'pending')->count(),
            'approved' => $volunteers->where('status', 'approved')->count(),
            'rejected' => $volunteers->where('status', 'rejected')->count(),
            'active_hours_month' => VolunteerActivity::whereMonth('activity_date', now()->month)->sum('hours_logged'),
        ];

        return response()->json([
            'metrics' => $metrics,
            'applications' => $volunteers->map(function($v) {
                return [
                    'id' => $v->id,
                    'name' => $v->user->name,
                    'email' => $v->user->email,
                    'phone' => $v->phone,
                    'skills' => $v->skills,
                    'availability' => $v->availability,
                    'preferred_shift' => $v->preferred_shift,
                    'status' => $v->status,
                    'applied_at' => $v->applied_at ? $v->applied_at->diffForHumans() : 'N/A',
                ];
            })->values(),
            'activity_logs' => VolunteerActivity::with(['volunteer.user'])->orderBy('created_at', 'desc')->limit(10)->get()
        ]);
    }

    /**
     * Approve or reject an application
     */
    public function review(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
            'reason' => 'nullable|string',
        ]);

        $volunteer = Volunteer::findOrFail($id);
        $volunteer->status = $validated['status'];
        
        if ($validated['status'] === 'approved') {
            $volunteer->approved_at = now();
        }
        $volunteer->save();

        // Send Email
        try {
            if ($validated['status'] === 'approved') {
                Mail::to($volunteer->user->email)->send(new VolunteerApproved($volunteer));
            } else {
                Mail::to($volunteer->user->email)->send(new VolunteerRejected($volunteer, $validated['reason']));
            }
        } catch (\Exception $e) {
            Log::error('Failed to send volunteer email: ' . $e->getMessage());
        }

        return response()->json(['message' => 'Volunteer application ' . $validated['status']]);
    }
}
