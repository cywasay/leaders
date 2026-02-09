<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OnboardingConfig;

class OnboardingConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configs = [
            'healthcare' => [
                'role' => 'healthcare',
                'title' => 'Practice & Brand Foundation',
                'steps' => ['My Foundation', 'My Story & Trust', 'Website Features'],
                'nameLabel' => 'Practitioner Full Name *',
                'namePlaceholder' => 'e.g. Dr. Saif Ullah',
                'onboardingTitle' => 'Healthcare Onboarding',
                'sections' => [
                    'specialties' => [
                         'label' => 'Specialty / Focus Area (Select all that apply)',
                         'placeholder' => 'Add other specialties...',
                         'options' => [
                             'Anxiety', 'Depression', 'Trauma', 'Relationship Issues',
                             'ADHD', 'LGBTQ+', 'Children & Adolescents', 'Sports Psychology',
                             'Eating Disorders', 'Addiction'
                         ]
                    ],
                    'practiceType' => [
                         'label' => 'Practice Type (Select all that apply)',
                         'options' => [
                             'Private Practice', 'Group Practice', 'Online Only', 'Hybrid'
                         ]
                    ],
                    'address' => [
                         'label' => 'Practice Address (or "Telehealth Only")',
                         'placeholder' => 'Full address'
                    ],
                    'idealAudience' => [
                         'title' => 'My Ideal Audience',
                         'description' => 'Describe who you help best. This helps us write better copy for your site.',
                         'options' => [
                             'Adults', 'Children', 'Teens', 'Families', 'Corporate', 'Other'
                         ]
                    ]
                ]
            ],
            'speaker' => [
                'role' => 'speaker',
                'title' => 'Speaker & Brand Foundation',
                'steps' => ['Speaker Roots', 'Stage Presence', 'Digital Platform'],
                'nameLabel' => 'Speaker Full Name *',
                'namePlaceholder' => 'e.g. John Speaker',
                'onboardingTitle' => 'Speaker Onboarding',
                'sections' => [
                     'specialties' => [
                          'label' => 'Speaking Topics (Select all that apply)',
                          'placeholder' => 'Add other topics...',
                          'options' => [
                              'Leadership', 'Motivation', 'Sales Strategy', 'Digital Transformation',
                              'Mental Health at Work', 'Entrepreneurship', 'Future of Work',
                              'Diversity & Inclusion', 'Emotional Intelligence', 'Storytelling'
                          ]
                     ],
                     'practiceType' => [
                          'label' => 'Speaker Type (Select all that apply)',
                          'options' => [
                              'Keynote Speaker', 'Workshop Facilitator', 'Corporate Trainer',
                              'Panelist', 'Master of Ceremonies'
                          ]
                     ],
                     'address' => [
                          'label' => 'Based In (City, State/Country)',
                          'placeholder' => 'e.g. New York, NY'
                     ],
                     'idealAudience' => [
                          'title' => 'My Target Audience',
                          'description' => 'Describe the types of audiences or organizations you speak to. This helps us tailor your marketing copy.',
                          'options' => [
                              'Corporate Teams', 'HR Professionals', 'Tech Conferences',
                              'University Students', 'Sales Teams', 'Small Business Owners',
                              'Non-Profits', 'Industry Leaders'
                          ]
                     ]
                ]
            ]
        ];

        foreach ($configs as $role => $config) {
            OnboardingConfig::updateOrCreate(
                ['role' => $role],
                ['config' => $config]
            );
        }
    }
}
