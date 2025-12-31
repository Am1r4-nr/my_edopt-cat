<?php

namespace Database\Seeders;

use App\Models\Adoption;
use App\Models\Cat;
use Illuminate\Database\Seeder;

class AdoptionSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure Cats exist first
        $cats = Cat::all();

        if ($cats->count() > 0) {
            Adoption::create([
                'applicant_name' => 'Sarah Johnson',
                'cat_id' => $cats->firstWhere('name', 'Luna')->id ?? 1,
                'status' => 'Pending',
                'stage' => 2,
                'application_date' => '2023-12-10',
                'match_score' => 85,
                'completed_tasks' => []
            ]);

            Adoption::create([
                'applicant_name' => 'Michael Chen',
                'cat_id' => $cats->firstWhere('name', 'Oliver')->id ?? 2,
                'status' => 'Approved',
                'stage' => 3, // Interview
                'application_date' => '2023-12-12',
                'match_score' => 91,
                'completed_tasks' => []
            ]);

            Adoption::create([
                'applicant_name' => 'Emily Davis',
                'cat_id' => $cats->firstWhere('name', 'Milo')->id ?? 4,
                'status' => 'Approved',
                'stage' => 4, // Approved
                'application_date' => '2023-12-14',
                'match_score' => 98,
                'completed_tasks' => []
            ]);

            Adoption::create([
                'applicant_name' => 'James Wilson',
                'cat_id' => $cats->firstWhere('name', 'Bella')->id ?? 5,
                'status' => 'Pending',
                'stage' => 1, // New
                'application_date' => '2023-12-15',
                'match_score' => 92,
                'completed_tasks' => []
            ]);
        }
    }
}
