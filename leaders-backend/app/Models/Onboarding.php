<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User; // Assuming User model is in App\Models namespace

class Onboarding extends Model
{
    protected $guarded = [];

    protected $casts = [
        'specialties' => 'array',
        'ideal_audience' => 'array',
        'practice_type' => 'array',
        'services' => 'array',
        'testimonials' => 'array',
        'website_goals' => 'array',
        'required_pages' => 'array',
        'hipaa_compliant' => 'boolean',
        'has_privacy_policy' => 'boolean',
        'has_terms' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
