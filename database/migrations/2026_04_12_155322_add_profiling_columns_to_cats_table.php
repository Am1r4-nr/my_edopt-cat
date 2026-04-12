<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cats', function (Blueprint $table) {
            $table->text('medical_notes')->nullable();
            $table->text('behavior_notes')->nullable();
            $table->integer('temperament_score')->nullable();
            $table->text('ai_description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cats', function (Blueprint $table) {
            $table->dropColumn(['medical_notes', 'behavior_notes', 'temperament_score', 'ai_description']);
        });
    }
};
