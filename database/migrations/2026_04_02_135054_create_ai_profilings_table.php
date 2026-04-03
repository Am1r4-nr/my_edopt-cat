<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('ai_profilings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_id')->constrained('cats')->cascadeOnDelete();
            $table->integer('temperament_score')->default(0);
            $table->integer('death_prediction_score')->default(0);
            $table->text('generated_care_description')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('ai_profilings');
    }
};
