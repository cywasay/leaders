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
            // Step 2: Authority missing fields
            $table->text('key_achievements')->nullable();
            $table->text('numbers_impact')->nullable();
            $table->string('partner_orgs')->nullable();
            $table->string('grants_funding')->nullable();
            $table->string('media_coverage')->nullable();
            $table->text('training_programs')->nullable();
            $table->string('affiliations')->nullable();
            $table->string('podcasts')->nullable();
            $table->string('past_clients')->nullable();
            $table->text('degrees')->nullable();
            $table->string('grants')->nullable();
            $table->string('press_mentions')->nullable();
            $table->text('board_roles')->nullable();
            $table->string('media_mentions')->nullable();
            $table->string('publications')->nullable();
            $table->string('speaking_engagements')->nullable();
            $table->string('conferences')->nullable();
            $table->string('open_source')->nullable();
            $table->string('media_awards')->nullable();
            $table->text('why_this_work')->nullable();
            $table->text('current_programs')->nullable();
            $table->text('past_initiatives')->nullable();
            $table->string('geographic_reach')->nullable();
            $table->text('signature_topics')->nullable();
            $table->text('results_impact')->nullable();
            $table->text('case_studies')->nullable();
            $table->text('research_focus')->nullable();
            $table->text('ongoing_work')->nullable();
            $table->text('impact_statement')->nullable();
            $table->text('career_milestones')->nullable();
            $table->text('business_outcomes')->nullable();
            $table->text('notable_projects')->nullable();
            $table->text('innovation_details')->nullable();
            $table->text('metrics_impact')->nullable();

            // Step 3: Integrations missing fields
            $table->string('donation_link')->nullable();
            $table->string('newsletter_signup')->nullable();
            $table->string('volunteer_form')->nullable();
            $table->string('event_registration')->nullable();
            $table->string('google_scholar')->nullable();
            $table->string('orcid')->nullable();
            $table->string('research_gate')->nullable();
            $table->string('demo_link')->nullable();
            $table->string('github_link')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('onboardings', function (Blueprint $table) {
            $table->dropColumn([
                'key_achievements', 'numbers_impact', 'partner_orgs', 'grants_funding', 
                'media_coverage', 'training_programs', 'affiliations', 'podcasts', 
                'past_clients', 'degrees', 'grants', 'press_mentions', 'board_roles', 
                'media_mentions', 'publications', 'speaking_engagements', 'conferences', 
                'open_source', 'media_awards', 'why_this_work', 'current_programs', 
                'past_initiatives', 'geographic_reach', 'signature_topics', 'results_impact', 
                'case_studies', 'research_focus', 'ongoing_work', 'impact_statement', 
                'career_milestones', 'business_outcomes', 'notable_projects', 
                'innovation_details', 'metrics_impact', 'donation_link', 'newsletter_signup', 
                'volunteer_form', 'event_registration', 'google_scholar', 'orcid', 
                'research_gate', 'demo_link', 'github_link'
            ]);
        });
    }
};
