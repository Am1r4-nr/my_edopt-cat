<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        // Mock data to replace mockMessages in frontend
        $messages = [
            [
                'id' => 1,
                'sender' => 'Dr. Aminah',
                'avatar' => 'DA',
                'preview' => 'The vaccination schedule for Luna is updated.',
                'time' => '10:30 AM',
                'unread' => true,
                'content' => [
                    ['sender' => 'me', 'text' => "Hi Dr. Aminah, just checking on Oliver's status?"],
                    ['sender' => 'them', 'text' => "Hello! Yes, I've updated his vaccination schedule. He's doing great!"]
                ]
            ],
            [
                'id' => 2,
                'sender' => 'Sarah Lee',
                'avatar' => 'SL',
                'preview' => 'I would like to visit the shelter this weekend.',
                'time' => 'Yesterday',
                'unread' => false,
                'content' => [
                    ['sender' => 'them', 'text' => 'I would like to visit the shelter this weekend.']
                ]
            ],
            [
                'id' => 3,
                'sender' => 'Volunteer Group',
                'avatar' => 'VG',
                'preview' => 'New roster for next month is out.',
                'time' => '2 days ago',
                'unread' => false,
                'content' => []
            ],
        ];

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        // Simulating sending a message
        return response()->json(['status' => 'success', 'message' => 'Message sent']);
    }
}
