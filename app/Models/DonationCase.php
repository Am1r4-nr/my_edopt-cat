<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'cat_id',
        'title',
        'description',
        'target_amount',
        'current_amount',
        'status', // 'active', 'funded', 'closed'
    ];

    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }
}
