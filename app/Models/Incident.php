<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    use HasFactory;

    protected $fillable = [
        'cat_id',
        'reporter_user_id',
        'type',
        'description',
        'photo_url',
        'severity',
        'latitude',
        'longitude',
        'status',
        'reported_at'
    ];

    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_user_id');
    }
}
