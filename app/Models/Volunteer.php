<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Volunteer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone',
        'skills',
        'availability', // JSON array preferred
        'preferred_shift',
        'status', // pending, approved, rejected
        'applied_at',
        'approved_at',
    ];

    protected $casts = [
        'availability' => 'array',
        'applied_at' => 'datetime',
        'approved_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activities()
    {
        return $this->hasMany(VolunteerActivity::class);
    }
}
