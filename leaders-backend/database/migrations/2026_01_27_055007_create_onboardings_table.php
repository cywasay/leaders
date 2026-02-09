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
        Schema::create('onboardings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // Step 1: Foundation
            $table->string('practice_name')->nullable();
            $table->string('practitioner_name')->nullable();
            $table->string('credentials')->nullable();
            $table->string('practice_type')->nullable();
            $table->string('years_experience')->nullable();
            $table->string('primary_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->text('address')->nullable();
            $table->string('regions_served')->nullable();
            $table->string('timezone')->nullable();
            $table->json('ideal_audience')->nullable();
            $table->text('patient_problem')->nullable();
            $table->string('brand_tone')->nullable();

            // Step 2: Authority
            $table->text('education')->nullable();
            $table->string('certifications')->nullable();
            $table->string('board_certifications')->nullable();
            $table->text('awards')->nullable();
            $table->string('media_features')->nullable();
            $table->text('short_bio')->nullable();
            $table->text('full_story')->nullable();
            $table->text('work_motivation')->nullable();
            $table->text('personal_mission')->nullable();
            $table->json('services')->nullable();
            $table->json('testimonials')->nullable();

            // Step 3: Final
            $table->json('website_goals')->nullable();
            $table->json('required_pages')->nullable();
            $table->string('booking_url')->nullable();
            $table->string('patient_portal_url')->nullable();
            $table->text('social_links')->nullable(); // Can be JSON or simple text
            $table->string('headshot_path')->nullable();
            $table->text('clinic_images_path')->nullable();
            $table->boolean('hipaa_compliant')->default(false);
            $table->boolean('has_privacy_policy')->default(false);
            $table->boolean('has_terms')->default(false);
            $table->integer('current_step')->default(1);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('onboardings');
    }
};
