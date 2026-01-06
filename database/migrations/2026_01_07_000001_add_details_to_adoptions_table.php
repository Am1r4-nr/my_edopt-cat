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
        Schema::table('adoptions', function (Blueprint $table) {
            $table->string('email')->after('applicant_name')->nullable();
            $table->string('phone')->after('email')->nullable();
            $table->text('address')->after('phone')->nullable();
            $table->string('housing_type')->after('address')->nullable();
            $table->boolean('has_pets')->default(false)->after('housing_type');
            $table->text('reason')->after('has_pets')->nullable();
            $table->unsignedBigInteger('user_id')->nullable()->after('cat_id');

            // Add foreign key for user if desired, but make it nullable as guests can maybe apply?
            // Actually, for now let's just keep it as a loose reference or add constraint if we trust users table
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('adoptions', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['email', 'phone', 'address', 'housing_type', 'has_pets', 'reason', 'user_id']);
        });
    }
};
