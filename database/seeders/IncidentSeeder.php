<?php

namespace Database\Seeders;

use App\Models\Incident;
use Illuminate\Database\Seeder;

class IncidentSeeder extends Seeder
{
    public function run(): void
    {
        Incident::create([
            'type' => 'Injured Cat',
            'description' => 'Cat with leg injury near cafeteria',
            'severity' => 'Critical',
            'latitude' => 3.2535,
            'longitude' => 101.7346,
            'status' => 'Open',
            'reported_at' => '2023-12-28 10:30:00'
        ]);

        Incident::create([
            'type' => 'Lost Cat',
            'description' => 'Orange tabby sighted near library',
            'severity' => 'Medium',
            'latitude' => 3.2545,
            'longitude' => 101.7356,
            'status' => 'Open',
            'reported_at' => '2023-12-28 14:15:00'
        ]);

        Incident::create([
            'type' => 'Kitten Found',
            'description' => 'Box of kittens found behind sports complex',
            'severity' => 'High',
            'latitude' => 3.2525,
            'longitude' => 101.7336,
            'status' => 'Resolved',
            'reported_at' => '2023-12-29 09:00:00'
        ]);
    }
}
