<?php

namespace App\Services;

use App\Models\Donation;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ToyyibPayService
{
    protected $url;
    protected $secretKey;
    protected $categoryCode;

    public function __construct()
    {
        $this->url = config('toyyibpay.url');
        $this->secretKey = config('toyyibpay.secret_key');
        $this->categoryCode = config('toyyibpay.category_code');
    }

    /**
     * Creates a bill using ToyyibPay API.
     * Returns the bill code and the URL to redirect the user to.
     */
    public function createBill(Donation $donation, $donorName, $donorEmail)
    {
        $caseTitle = $donation->donationCase->title;

        $payload = [
            'userSecretKey' => $this->secretKey,
            'categoryCode' => $this->categoryCode,
            'billName' => "Donation for {$caseTitle}",
            'billDescription' => "Adoption & Rescue Fund for ID {$donation->donation_case_id}",
            'billPriceSetting' => 1,
            'billPayorInfo' => 1,
            'billAmount' => $donation->amount * 100, // ToyyibPay expects cents
            'billReturnUrl' => url('/api/donate/callback?action=return'),
            'billCallbackUrl' => url('/api/donate/callback?action=server'),
            'billExternalReferenceNo' => $donation->id,
            'billTo' => $donorName,
            'billEmail' => $donorEmail,
            'billPhone' => '0123456789', // Example or could be captured
            'billSplitPayment' => 0,
            'billSplitPaymentArgs' => '',
            'billPaymentChannel' => '0', // 0 for all methods (FPX, CC)
        ];

        // For local development mockup, if using a fake category code, we intercept here:
        if ($this->categoryCode === 'mock-category') {
            return [
                'success' => true,
                'bill_code' => 'MOCKBILL' . rand(1000, 9999),
                'bill_url' => url('/api/donate/mock-payment?ref=' . $donation->id),
            ];
        }

        try {
            $response = Http::asForm()->post("{$this->url}/index.php/api/createBill", $payload);

            if ($response->successful() && is_array($response->json())) {
                $billCode = $response->json()[0]['BillCode'];
                return [
                    'success' => true,
                    'bill_code' => $billCode,
                    'bill_url' => "{$this->url}/{$billCode}",
                ];
            }
            
            Log::error('ToyyibPay CreateBill Error: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('ToyyibPay CreateBill Exception: ' . $e->getMessage());
        }

        return [
            'success' => false,
            'message' => 'Unable to generate payment link.',
        ];
    }
}
