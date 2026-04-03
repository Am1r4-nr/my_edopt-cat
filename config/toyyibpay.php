<?php

return [
    'secret_key' => env('TOYYIBPAY_API_KEY', 'some-mock-dev-secret-key'),
    'category_code' => env('TOYYIBPAY_CATEGORY_CODE', 'mock-category'),
    'url' => env('TOYYIBPAY_URL', 'https://dev.toyyibpay.com'),
];
