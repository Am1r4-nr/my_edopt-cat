<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('donation_cases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_id')->nullable()->constrained('cats')->nullOnDelete();
            $table->string('title');
            $table->text('description');
            $table->decimal('target_amount', 10, 2);
            $table->decimal('current_amount', 10, 2)->default(0);
            $table->enum('status', ['active', 'funded', 'closed'])->default('active');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('donation_cases');
    }
};
