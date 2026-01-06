<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FinanceController extends Controller
{
    public function index()
    {
        // In a real app, this would aggregate data from a Transaction model
        // For now, we'll return structured data that matches the frontend expectation
        // potentially fetching from the 'finances' table if populated

        $revenue = [
            'total' => 45200,
            'growth' => 12, // percentage
            'history' => [
                ['name' => 'Jan', 'donations' => 4000, 'adopttionFees' => 2400],
                ['name' => 'Feb', 'donations' => 3000, 'adopttionFees' => 1398],
                ['name' => 'Mar', 'donations' => 2000, 'adopttionFees' => 9800],
                ['name' => 'Apr', 'donations' => 2780, 'adopttionFees' => 3908],
                ['name' => 'May', 'donations' => 1890, 'adopttionFees' => 4800],
                ['name' => 'Jun', 'donations' => 2390, 'adopttionFees' => 3800],
            ]
        ];

        $funds = [
            [
                'name' => 'Medical Fund',
                'current' => 15450,
                'target' => 20000,
                'color' => 'bg-purple-500'
            ],
            [
                'name' => 'Shelter Upgrade',
                'current' => 8240,
                'target' => 15000,
                'color' => 'bg-blue-500'
            ],
            [
                'name' => 'Food & Supplies',
                'current' => 3500,
                'target' => 5000,
                'color' => 'bg-green-500'
            ]
        ];

        return response()->json([
            'revenue' => $revenue,
            'funds' => $funds,
            'metrics' => [
                'total_revenue' => 'RM 45,200',
                'medical_fund' => 'RM 15,450',
                'toyyibpay_balance' => 'RM 8,240'
            ]
        ]);
    }
}
