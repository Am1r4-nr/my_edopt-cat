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
        Schema::create('cats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('breed')->nullable();
            $table->string('age')->nullable();
            $table->string('sex')->nullable();
            $table->string('status')->default('Available'); // Available, Adopted, Medical Hold, Foster
            $table->string('location')->nullable();
            $table->integer('risk_score')->default(0);
            $table->date('intake_date')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cats');
    }
};
