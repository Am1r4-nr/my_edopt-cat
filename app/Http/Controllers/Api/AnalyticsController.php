<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function index()
    {
        $population = [
            ['name' => 'Healthy', 'value' => 45, 'fill' => '#10B981'],
            ['name' => 'Special Needs', 'value' => 15, 'fill' => '#F59E0B'],
            ['name' => 'Quarantine', 'value' => 10, 'fill' => '#EF4444'],
            ['name' => 'Foster Care', 'value' => 25, 'fill' => '#3B82F6'],
        ];

        $efficiency = [
            ['name' => 'Intake', 'manual' => 45, 'digital' => 15],
            ['name' => 'Adoption', 'manual' => 120, 'digital' => 40],
            ['name' => 'Medical', 'manual' => 60, 'digital' => 20],
            ['name' => 'Reporting', 'manual' => 90, 'digital' => 5],
        ];

        return response()->json([
            'population' => $population,
            'efficiency' => $efficiency
        ]);
    }
}
