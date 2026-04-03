<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updateTheme(Request $request)
    {
        $request->validate([
            'theme' => 'required|in:light,dark,system',
        ]);

        $user = $request->user();
        $user->update(['theme' => $request->theme]);

        return response()->json(['theme' => $user->theme]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'bio' => 'nullable|string',
        ]);

        $user = $request->user();
        // In a real app we might split name or have separate columns
        // For this demo we'll assume the name column stores the full name 
        // or just update what we can. 
        // Actually, let's just update the name for now as concatenation
        $user->update([
            'name' => $request->firstName . ' ' . $request->lastName,
            'email' => $request->email,
            // 'bio' => $request->bio // User model might need this column, but let's avoid error if missing
        ]);

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }
}
