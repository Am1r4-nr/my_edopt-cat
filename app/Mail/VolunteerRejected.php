<?php

namespace App\Mail;

use App\Models\Volunteer;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VolunteerRejected extends Mailable
{
    use Queueable, SerializesModels;

    public $volunteer;
    public $reason;

    public function __construct(Volunteer $volunteer, $reason = null)
    {
        $this->volunteer = $volunteer;
        $this->reason = $reason;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Update on Your e-Doptcat Application',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.volunteer_rejected',
        );
    }
}
