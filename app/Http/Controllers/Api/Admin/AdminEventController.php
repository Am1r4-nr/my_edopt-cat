<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class AdminEventController extends Controller
{
    public function index()
    {
        $events = Event::withCount('registrations')->orderBy('start_date', 'desc')->get();
        return response()->json($events);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'type' => 'required|string',
            'location' => 'nullable|string',
            'capacity' => 'nullable|integer|min:1',
            'features' => 'nullable|array',
        ]);

        $event = Event::create(array_merge($validated, [
            'is_published' => true,
            'created_by_admin_id' => auth()->id()
        ]));

        return response()->json($event, 201);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'type' => 'required|string',
            'location' => 'nullable|string',
            'is_published' => 'boolean',
            'capacity' => 'nullable|integer|min:1',
            'features' => 'nullable|array',
        ]);

        $event->update($validated);
        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->noContent();
    }

    public function attendees(Event $event)
    {
        $attendees = $event->registrations()->orderBy('created_at', 'desc')->get()->map(function($reg) {
            return [
                'id' => $reg->id,
                'name' => $reg->name ?? ($reg->user ? $reg->user->name : 'Unknown User'),
                'email' => $reg->email ?? ($reg->user ? $reg->user->email : 'Unknown Email'),
                'interest' => $reg->interest ?? '-',
                'registeredAt' => $reg->created_at->format('M d')
            ];
        });

        return response()->json([
            'event' => $event,
            'attendees' => $attendees
        ]);
    }
}
