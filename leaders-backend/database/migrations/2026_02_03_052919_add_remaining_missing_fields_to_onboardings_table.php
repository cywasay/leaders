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
            $table->string('linkedin')->nullable();
            $table->string('existing_content_path')->nullable();
            $table->string('public_email')->nullable();
            $table->string('inquiry_types')->nullable();
            $table->string('seo_keywords')->nullable();
            $table->string('target_industries')->nullable();
            $table->string('target_regions')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('onboardings', function (Blueprint $table) {
            $table->dropColumn([
                'linkedin', 'existing_content_path', 'public_email', 
                'inquiry_types', 'seo_keywords', 'target_industries', 'target_regions'
            ]);
        });
    }
};
