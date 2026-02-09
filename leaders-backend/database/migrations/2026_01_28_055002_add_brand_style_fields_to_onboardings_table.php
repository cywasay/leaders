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
            $table->text('liked_websites')->nullable()->after('brand_tone');
            $table->string('brand_colors')->nullable()->after('liked_websites');
            $table->string('logo_path')->nullable()->after('brand_colors');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('onboardings', function (Blueprint $table) {
            $table->dropColumn(['liked_websites', 'brand_colors', 'logo_path']);
        });
    }
};
