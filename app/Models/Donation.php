<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'donation_case_id',
        'amount',
        'payment_status', // 'pending', 'success', 'failed'
        'toyyibpay_bill_code',
        'transaction_id', // Stores the ToyyibPay transaction ref
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function donationCase()
    {
        return $this->belongsTo(DonationCase::class);
    }
}
