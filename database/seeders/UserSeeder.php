<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if user exists to avoid duplicates if run multiple times
        $user = User::where('email', 'admin@edoptcat.com')->first();

        if (!$user) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@edoptcat.com', // Updated to match the credentials we've been using
                'password' => Hash::make('password'),
                'theme' => 'system',
                'role' => 'admin',
            ]);
        }

        $regularUser = User::where('email', 'regular@test.com')->first();
        if (!$regularUser) {
            User::create([
                'name' => 'Regular User',
                'email' => 'regular@test.com',
                'password' => Hash::make('password'),
                'theme' => 'system',
                'role' => 'user',
            ]);
        }
    }
}
