<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of upcoming published events.
     */
    public function index()
    {
        return Event::where('is_published', true)
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->get();
    }

    /**
     * Display a specific published event with its registrations count.
     */
    public function show(Event $event)
    {
        if (!$event->is_published) {
            return response()->json(['message' => 'Event not found.'], 404);
        }

        $event->loadCount('registrations');
        return $event;
    }

    /**
     * Register a user (or guest) for an event.
     */
    public function register(Request $request, Event $event)
    {
        if (!$event->is_published) {
            return response()->json(['message' => 'Event not available.'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'interest' => 'nullable|string',
        ]);

        // Check capacity
        if ($event->capacity && $event->registrations()->count() >= $event->capacity) {
            return response()->json(['message' => 'Event is fully booked.'], 422);
        }

        $registration = EventRegistration::create([
            'event_id' => $event->id,
            'user_id' => auth()->check() ? auth()->id() : null,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'interest' => $validated['interest'],
        ]);

        return response()->json(['message' => 'Successfully registered!', 'registration' => $registration], 201);
    }
}
