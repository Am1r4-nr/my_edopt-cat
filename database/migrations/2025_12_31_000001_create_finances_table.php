<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('finances', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('amount', 10, 2);
            $table->string('type'); // income, expense
            $table->string('category'); // Donation, Adoption Fee, Medical, Food, General
            $table->string('payment_method')->nullable(); // ToyyibPay, Cash, Bank Transfer
            $table->string('reference_id')->nullable();
            $table->string('status')->default('completed'); // completed, pending, failed
            $table->date('transaction_date');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finances');
    }
};
