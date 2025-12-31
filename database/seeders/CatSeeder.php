<?php

namespace Database\Seeders;

use App\Models\Cat;
use Illuminate\Database\Seeder;

class CatSeeder extends Seeder
{
    public function run(): void
    {
        $cats = [
            [
                'name' => 'Luna',
                'breed' => 'Siamese',
                'age' => '2 years',
                'sex' => 'Female',
                'status' => 'Available',
                'location' => 'Zone A',
                'risk_score' => 12,
                'intake_date' => '2023-10-15',
                'image_url' => 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Oliver',
                'breed' => 'Tabby',
                'age' => '4 years',
                'sex' => 'Male',
                'status' => 'Medical Hold',
                'location' => 'Quarantine',
                'risk_score' => 85,
                'intake_date' => '2023-11-01',
                'image_url' => 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Leo',
                'breed' => 'Maine Coon',
                'age' => '1 year',
                'sex' => 'Male',
                'status' => 'Adopted',
                'location' => 'Home',
                'risk_score' => 5,
                'intake_date' => '2023-09-20',
                'image_url' => 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Milo',
                'breed' => 'Domestic Short Hair',
                'age' => '3 months',
                'sex' => 'Male',
                'status' => 'Foster',
                'location' => 'Foster Home #12',
                'risk_score' => 45,
                'intake_date' => '2023-12-05',
                'image_url' => 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Bella',
                'breed' => 'Persian',
                'age' => '5 years',
                'sex' => 'Female',
                'status' => 'Available',
                'location' => 'Zone B',
                'risk_score' => 22,
                'intake_date' => '2023-08-10',
                'image_url' => 'https://images.unsplash.com/photo-1495360019602-e00192160351?w=400&h=300&fit=crop'
            ],
            // Add a few more for pagination testing
            [
                'name' => 'Shadow',
                'breed' => 'Bombay',
                'age' => '3 years',
                'sex' => 'Male',
                'status' => 'Available',
                'location' => 'Zone A',
                'risk_score' => 15,
                'intake_date' => '2023-11-15',
                'image_url' => 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Lucy',
                'breed' => 'Calico',
                'age' => '2 years',
                'sex' => 'Female',
                'status' => 'Available',
                'location' => 'Zone C',
                'risk_score' => 8,
                'intake_date' => '2023-10-25',
                'image_url' => 'https://images.unsplash.com/photo-1529778873920-4da4926a7071?w=400&h=300&fit=crop'
            ],
        ];

        foreach ($cats as $cat) {
            Cat::create($cat);
        }
    }
}
