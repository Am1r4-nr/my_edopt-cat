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
}
