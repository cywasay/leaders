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
            $table->text('final_notes')->nullable()->after('terms_condition_type');
            $table->text('competitors_admired')->nullable()->after('final_notes');
            $table->string('deadline_expectations')->nullable()->after('competitors_admired');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('onboardings', function (Blueprint $table) {
            $table->dropColumn(['final_notes', 'competitors_admired', 'deadline_expectations']);
        });
    }
};
