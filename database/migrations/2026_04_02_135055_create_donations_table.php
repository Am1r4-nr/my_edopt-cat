<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('donation_case_id')->nullable()->constrained('donation_cases')->nullOnDelete();
            $table->decimal('amount', 10, 2);
            $table->string('payment_status')->default('pending');
            $table->string('toyyibpay_bill_code')->nullable();
            $table->string('transaction_id')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('donations');
    }
};
