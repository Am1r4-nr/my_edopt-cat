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
        'image_url'
    ];
}
