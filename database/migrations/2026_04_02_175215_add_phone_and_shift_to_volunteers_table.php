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
        Schema::table('volunteers', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('user_id');
            $table->string('preferred_shift')->nullable()->after('availability');
            $table->timestamp('applied_at')->nullable()->after('status');
            $table->timestamp('approved_at')->nullable()->after('applied_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('volunteers', function (Blueprint $table) {
            $table->dropColumn(['phone', 'preferred_shift', 'applied_at', 'approved_at']);
        });
    }
};
