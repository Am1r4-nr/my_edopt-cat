<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\DonationCase;
use App\Services\ToyyibPayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DonationController extends Controller
{
    /**
     * Display a listing of active donation cases.
     */
    public function index()
    {
        $cases = DonationCase::with('cat')->where('status', 'active')->get();
        return response()->json($cases);
    }

    /**
     * Initiate a donation transaction.
     */
    public function donate(Request $request, ToyyibPayService $service)
    {
        $validated = $request->validate([
            'case_id' => 'required|exists:donation_cases,id',
            'amount' => 'required|numeric|min:1',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $donation = Donation::create([
            'user_id' => auth()->id(), // Allow null if guest
            'donation_case_id' => $validated['case_id'],
            'amount' => $validated['amount'],
            'payment_status' => 'pending',
        ]);

        $result = $service->createBill($donation, $validated['name'], $validated['email']);

        if ($result['success']) {
            $donation->update(['toyyibpay_bill_code' => $result['bill_code']]);
            return response()->json(['redirect_url' => $result['bill_url']]);
        }

        return response()->json(['message' => $result['message']], 500);
    }

    /**
     * Handle callbacks from ToyyibPay and mock payments.
     */
    public function callback(Request $request)
    {
        if ($request->action === 'server') {
            // Server-to-server webhook
            $billcode = $request->input('billcode');
            $status = $request->input('status_id'); // 1 = success, 2 = pending, 3 = fail
            $refNo = $request->input('refno');

            if ($status == 1) {
                $this->processSuccessPayment($billcode, $refNo);
            }
            return response('OK');
        }

        if ($request->action === 'return' || $request->has('status_id')) {
            // User redirected back
            $status = $request->input('status_id');
            if ($status == 1) {
                return redirect('/donate?payment=success');
            }
            return redirect('/donate?payment=failed');
        }

        return response('Invalid request');
    }

    /**
     * Mock payment flow for dev mode.
     */
    public function mockPayment(Request $request)
    {
        $donationId = $request->query('ref');
        $donation = Donation::findOrFail($donationId);
        $this->processSuccessPayment($donation->toyyibpay_bill_code, 'MOCK_TX_' . rand(1000, 9999));
        
        return redirect('/donate?payment=success');
    }

    private function processSuccessPayment($billcode, $transactionId)
    {
        $donation = Donation::where('toyyibpay_bill_code', $billcode)
            ->where('payment_status', 'pending')
            ->first();

        if ($donation) {
            $donation->update([
                'payment_status' => 'success',
                'transaction_id' => $transactionId
            ]);

            $case = $donation->donationCase;
            $case->increment('current_amount', $donation->amount);
        }
    }
}
