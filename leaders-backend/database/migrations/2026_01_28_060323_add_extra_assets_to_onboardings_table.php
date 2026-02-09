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
            $table->string('lead_magnets_path')->nullable()->after('headshot_path');
            $table->string('media_logos_path')->nullable()->after('lead_magnets_path');
            $table->string('other_assets_path')->nullable()->after('media_logos_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('onboardings', function (Blueprint $table) {
            $table->dropColumn(['lead_magnets_path', 'media_logos_path', 'other_assets_path']);
        });
    }
};
