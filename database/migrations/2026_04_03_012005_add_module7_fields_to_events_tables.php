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
        Schema::table('events', function (Blueprint $table) {
            $table->boolean('is_published')->default(false)->after('location');
            $table->foreignId('created_by_admin_id')->nullable()->constrained('users')->nullOnDelete()->after('is_published');
            $table->string('image_url')->nullable()->after('created_by_admin_id');
            $table->integer('capacity')->nullable()->after('image_url');
        });

        Schema::table('event_registrations', function (Blueprint $table) {
            // Drop existing foreign key and make nullable
            $table->dropForeign(['user_id']);
            $table->unsignedBigInteger('user_id')->nullable()->change();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();

            $table->string('name')->nullable()->after('event_id');
            $table->string('email')->nullable()->after('name');
            $table->string('interest')->nullable()->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['created_by_admin_id']);
            $table->dropColumn(['is_published', 'created_by_admin_id', 'image_url', 'capacity']);
        });

        Schema::table('event_registrations', function (Blueprint $table) {
            $table->dropColumn(['name', 'email', 'interest']);
            // Revert strict FK
            $table->dropForeign(['user_id']);
            $table->unsignedBigInteger('user_id')->nullable(false)->change();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }
};
