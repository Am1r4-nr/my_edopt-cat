<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('health_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_id')->constrained('cats')->cascadeOnDelete();
            $table->string('vaccination')->nullable();
            $table->string('treatment')->nullable();
            $table->string('vet_name')->nullable();
            $table->text('notes')->nullable();
            $table->date('record_date')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('health_records');
    }
};
