<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpsLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'cat_id',
        'latitude',
        'longitude',
        'logged_by_user_id',
        'method'
    ];

    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }

    public function logger()
    {
        return $this->belongsTo(User::class, 'logged_by_user_id');
    }
}
