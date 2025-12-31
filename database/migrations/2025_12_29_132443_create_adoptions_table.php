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
        Schema::create('adoptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cat_id');
            $table->string('applicant_name');
            $table->string('status')->default('Pending'); // Pending, Approved, Rejected
            $table->integer('stage')->default(1); // 1: New, 2: Review, 3: Interview, 4: Approved
            $table->date('application_date')->nullable();
            $table->integer('match_score')->default(0);
            $table->json('completed_tasks')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('cat_id')->references('id')->on('cats')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adoptions');
    }
};
