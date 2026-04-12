<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cat extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'breed',
        'age',
        'sex',
        'status',
        'location',
        'risk_score',
        'intake_date',
        'image_url',
        'medical_notes',
        'behavior_notes',
        'temperament_score',
        'ai_description'
    ];

    public function adoptions()
    {
        return $this->hasMany(Adoption::class);
    }

    public function incidents()
    {
        return $this->hasMany(Incident::class);
    }

    public function gpsLocations()
    {
        return $this->hasMany(GpsLocation::class);
    }
}
