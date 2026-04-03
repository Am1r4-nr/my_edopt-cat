<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VolunteerActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'volunteer_id',
        'activity_name',
        'description',
        'activity_date',
        'hours_logged',
    ];

    protected $casts = [
        'activity_date' => 'date',
    ];

    public function volunteer()
    {
        return $this->belongsTo(Volunteer::class);
    }
}
