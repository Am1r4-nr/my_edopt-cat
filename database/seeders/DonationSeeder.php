<?php

namespace Database\Seeders;

use App\Models\DonationCase;
use App\Models\Donation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DonationSeeder extends Seeder
{
    public function run(): void
    {
        $case1 = DonationCase::create([
            'title' => 'Emergency Dental Surgery for Whiskers',
            'description' => 'Whiskers was rescued from an abandoned warehouse with severe dental distress. He needs immediate extraction surgery to eat comfortably again.',
            'target_amount' => 1250.00,
            'current_amount' => 860.00,
            'status' => 'active'
        ]);

        $case2 = DonationCase::create([
            'title' => 'Senior Care Support',
            'description' => 'Luna is a 12-year-old sweetheart requiring monthly arthritis medication and specialized senior kibble.',
            'target_amount' => 800.00,
            'current_amount' => 450.00,
            'status' => 'active'
        ]);

        $case3 = DonationCase::create([
            'title' => 'Post-Rescue Grooming',
            'description' => 'Rescued with severe matting. Snowy needs professional dermatological grooming and skin treatment.',
            'target_amount' => 300.00,
            'current_amount' => 70.00,
            'status' => 'active'
        ]);

        $case4 = DonationCase::create([
            'title' => 'Travel Fund for Adoption',
            'description' => 'Shadow has found his forever home interstate! Help us cover the costs of safe pet transport and travel certificates.',
            'target_amount' => 600.00,
            'current_amount' => 200.00,
            'status' => 'active'
        ]);

        $user = User::first() ?? User::factory()->create();

        Donation::create([
            'user_id' => $user->id,
            'donation_case_id' => $case1->id,
            'amount' => 250.00,
            'payment_status' => 'success',
            'toyyibpay_bill_code' => 'TEST1234',
            'transaction_id' => 'TOY-4457221'
        ]);

        Donation::create([
            'user_id' => null, // Anonymous
            'donation_case_id' => $case2->id,
            'amount' => 1000.00,
            'payment_status' => 'success',
            'toyyibpay_bill_code' => 'TEST5678',
            'transaction_id' => 'TOY-4467117'
        ]);

        Donation::create([
            'user_id' => $user->id,
            'donation_case_id' => $case3->id,
            'amount' => 50.00,
            'payment_status' => 'pending',
            'toyyibpay_bill_code' => 'TEST9999',
            'transaction_id' => 'TOY-9883041'
        ]);
    }
}
