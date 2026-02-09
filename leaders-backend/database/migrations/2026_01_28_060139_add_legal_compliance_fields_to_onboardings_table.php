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
        Schema::table('onboardings', function (Blueprint $table) {
            $table->text('medical_disclaimer')->nullable()->after('has_terms');
            $table->string('privacy_policy_type')->nullable()->after('medical_disclaimer');
            $table->string('terms_condition_type')->nullable()->after('privacy_policy_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('onboardings', function (Blueprint $table) {
            $table->dropColumn(['medical_disclaimer', 'privacy_policy_type', 'terms_condition_type']);
        });
    }
};
