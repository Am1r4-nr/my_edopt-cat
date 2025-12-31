<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adoption extends Model
{
    use HasFactory;

    protected $fillable = [
        'applicant_name',
        'cat_id',
        'status',
        'application_date',
        'stage',
        'match_score',
        'completed_tasks'
    ];

    protected $casts = [
        'completed_tasks' => 'array',
    ];

    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }
}
