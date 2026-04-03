<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('incidents', function (Blueprint $table) {
            $table->foreignId('cat_id')->nullable()->constrained('cats')->nullOnDelete()->after('id');
            $table->foreignId('reporter_user_id')->nullable()->constrained('users')->nullOnDelete()->after('cat_id');
            $table->string('photo_url')->nullable()->after('description');
            
            // Just updating default status
            $table->string('status')->default('Pending')->change();
        });

        // Update existing legacy statuses if any
        DB::table('incidents')->where('status', 'Open')->update(['status' => 'Pending']);

        Schema::table('gps_locations', function (Blueprint $table) {
            $table->foreignId('logged_by_user_id')->nullable()->constrained('users')->nullOnDelete()->after('longitude');
            $table->string('method')->nullable()->after('logged_by_user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incidents', function (Blueprint $table) {
            $table->dropForeign(['cat_id']);
            $table->dropForeign(['reporter_user_id']);
            $table->dropColumn(['cat_id', 'reporter_user_id', 'photo_url']);
            $table->string('status')->default('Open')->change();
        });

        Schema::table('gps_locations', function (Blueprint $table) {
            $table->dropForeign(['logged_by_user_id']);
            $table->dropColumn(['logged_by_user_id', 'method']);
        });
    }
};
