<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\DonationCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DonationAdminController extends Controller
{
    public function index()
    {
        $donations = Donation::with(['user', 'donationCase'])
            ->orderBy('created_at', 'desc')
            ->get();

        $activeCases = DonationCase::where('status', 'active')->count();
        $completedCases = DonationCase::where('status', 'funded')->count();
        
        // Sum using DB simply
        $totalRaised = Donation::where('payment_status', 'success')->sum('amount');

        $casesList = DonationCase::all();

        return response()->json([
            'metrics' => [
                'total_raised' => $totalRaised,
                'active_cases' => $activeCases,
                'completed_cases' => $completedCases,
            ],
            'recent_donations' => $donations->map(function($d) {
                return [
                    'id' => $d->id,
                    'donor_name' => $d->user ? $d->user->name : 'Anonymous',
                    'cat_case' => $d->donationCase ? $d->donationCase->title : 'Unknown',
                    'amount' => $d->amount,
                    'method' => 'Online Banking',
                    'transaction_id' => $d->transaction_id ?? '-',
                    'status' => $d->payment_status,
                    'date' => $d->created_at->format('M d, Y'),
                ];
            }),
            'active_tracking' => $casesList
        ]);
    }

    public function markAsFunded($id)
    {
        $case = DonationCase::findOrFail($id);
        $case->update(['status' => 'funded']);
        return response()->json(['message' => 'Case marked as funded successfully']);
    }
}
