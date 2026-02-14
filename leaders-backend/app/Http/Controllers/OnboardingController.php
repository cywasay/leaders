<?php

namespace App\Http\Controllers;

use App\Models\Onboarding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use App\Models\Customer;

class OnboardingController extends Controller
{

    /**
     * Get the current user's onboarding data.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $targetUserId = $user->id;
        $chargeId = $request->query('charge_id');

        if ($user->role === 'superadmin' && $request->has('user_id')) {
            $targetUserId = $request->query('user_id');
        }

        $query = Onboarding::where('user_id', $targetUserId);
        
        if ($chargeId) {
            $query->where('stripe_charge_id', $chargeId);
        }

        $onboarding = $query->first();

        return response()->json([
            'onboarding' => $onboarding
        ]);
    }

    /**
     * Get list of purchased items and map them to Form Categories.
     */
    public function getPurchasedForms()
    {
        $user = Auth::user();
        
        if (!config('services.stripe.secret')) {
             return response()->json(['forms' => []]);
        }
        
        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
        
        $purchasedItems = [];
        $charges_data = [];
        
        try {
            $customerRecord = Customer::where('user_id', $user->id)->first();
            
            // 1. Try by Stripe Customer ID
            if ($customerRecord && $customerRecord->stripe_customer_id) {
                try {
                    $charges = \Stripe\Charge::all(['customer' => $customerRecord->stripe_customer_id, 'limit' => 100]);
                    $charges_data = $charges->data;
                } catch (\Exception $e) {}
            } 
            
            // 2. Fallback: Search by email
            if (empty($charges_data)) {
                try {
                    $searchResults = \Stripe\Charge::search([
                        'query' => 'email:"' . $user->email . '"',
                        'limit' => 100,
                    ]);
                    $charges_data = $searchResults->data;
                } catch (\Exception $e) {}
            }

            // 3. Last resort: Manual filter of recent charges (very robust)
            if (empty($charges_data)) {
                try {
                    $recentCharges = \Stripe\Charge::all(['limit' => 50]);
                    foreach ($recentCharges->data as $c) {
                        $c_email = strtolower($c->receipt_email ?? $c->billing_details->email ?? '');
                        if ($c_email !== '' && $c_email === strtolower($user->email)) {
                            $charges_data[] = $c;
                        }
                    }
                } catch (\Exception $e) {}
            }

            foreach ($charges_data as $charge) {
                if ($charge->status !== 'succeeded') continue;
                
                $items = [];
                
                // Try to get detailed items if possible
                if ($charge->payment_intent) {
                    try {
                        $sessions = \Stripe\Checkout\Session::all([
                            'payment_intent' => $charge->payment_intent,
                            'limit' => 1
                        ]);
                        
                        if ($session = ($sessions->data[0] ?? null)) {
                            $lineItems = \Stripe\Checkout\Session::allLineItems($session->id);
                            foreach ($lineItems->data as $li) {
                                $items[] = [
                                    'name' => $li->description,
                                    'charge_id' => $charge->id . '_' . $li->id 
                                ];
                            }
                        }
                    } catch (\Exception $e) { /* Ignore and fallback */ }
                }

                // Fallback to charge description
                if (empty($items)) {
                    $items[] = [
                        'name' => $charge->description ?: 'Website Plan',
                        'charge_id' => $charge->id
                    ];
                }

                foreach ($items as $item) {
                    $desc = strtolower($item['name']);
                    
                    // Comprehensive Resemblance Mapping
                    $cat = match (true) {
                        str_contains($desc, 'tech') || str_contains($desc, 'portfolio') || str_contains($desc, 'developer') || str_contains($desc, 'professional') => 'tech',
                        str_contains($desc, 'surgeon') || str_contains($desc, 'healthcare') || str_contains($desc, 'doctor') || str_contains($desc, 'practice') || str_contains($desc, 'medical') || str_contains($desc, 'clinic') => 'healthcare',
                        str_contains($desc, 'agency') || str_contains($desc, 'creative') || str_contains($desc, 'lumenix') || str_contains($desc, 'business') || str_contains($desc, 'executive') || str_contains($desc, 'corporate') => 'business',
                        str_contains($desc, 'impact') || str_contains($desc, 'nonprofit') || str_contains($desc, 'mission') => 'impact',
                        str_contains($desc, 'speaker') || str_contains($desc, 'coach') || str_contains($desc, 'mentoring') => 'speaker',
                        str_contains($desc, 'research') || str_contains($desc, 'academic') || str_contains($desc, 'scholar') => 'research',
                        default => 'healthcare',
                    };

                    $purchasedItems[] = [
                        'charge_id' => $item['charge_id'],
                        'item_name' => $item['name'],
                        'category' => $cat,
                        'date' => date('M d, Y', $charge->created),
                    ];
                }
            }
        } catch (\Exception $e) {
            \Log::error("Purchased forms deep error: " . $e->getMessage());
        }

        // Final Fallback: if STILL nothing, but user has a category, show at least one
        if (empty($purchasedItems) && $user->category) {
            $purchasedItems[] = [
                'charge_id' => 'legacy_' . $user->id,
                'item_name' => ucfirst($user->category) . ' Website Plan',
                'category' => $user->category,
                'date' => 'Joined ' . $user->created_at->format('M d, Y'),
            ];
        }

        // Map status
        $forms = [];
        foreach ($purchasedItems as $item) {
            $onboarding = Onboarding::where('user_id', $user->id)
                ->where('stripe_charge_id', $item['charge_id'])
                ->first();
                
            $forms[] = [
                'charge_id' => $item['charge_id'],
                'item_name' => $item['item_name'],
                'category' => $item['category'],
                'status' => $onboarding ? ($onboarding->current_step >= 3 ? 'completed' : 'in_progress') : 'not_started',
                'current_step' => $onboarding ? $onboarding->current_step : 1,
            ];
        }

        return response()->json(['forms' => $forms]);
    }

    /**
     * Save onboarding progress.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'charge_id' => 'required|string',
            'category' => 'required|string',
            'practice_name' => 'nullable|string|max:255',
            'practitioner_name' => 'nullable|string|max:255',
            'primary_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'years_experience' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'regions_served' => 'nullable|string|max:255',
            'timezone' => 'nullable|string|max:100',
            'ideal_audience' => 'nullable', 
            'patient_problem' => 'nullable|string|max:2000',
            'specialties' => 'nullable', 
            'practice_type' => 'nullable',
            'services' => 'nullable',
            'testimonials' => 'nullable',
            'website_goals' => 'nullable',
            'required_pages' => 'nullable',
            'website_features' => 'nullable|string|max:2000',
            'aesthetic_preference' => 'nullable|string|max:255',
            'brand_tone' => 'nullable|string|max:255',
            'liked_websites' => 'nullable|string|max:1000',
            'brand_colors' => 'nullable|string|max:255',
            'short_bio' => 'nullable|string|max:2000',
            'full_story' => 'nullable|string|max:5000',
            'bio_snippet' => 'nullable|string|max:2000',
            'booking_url' => 'nullable|string|max:500',
            'patient_portal_url' => 'nullable|string|max:500',
            'social_links' => 'nullable', 
            'hipaa_compliant' => 'nullable|boolean',
            'current_step' => 'nullable|integer',
            'logo' => 'nullable|image|max:5120',
            'headshot' => 'nullable|image|max:5120',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $data = $validated;
        unset($data['logo'], $data['headshot'], $data['cv'], $data['charge_id']);
        
        $chargeId = $request->input('charge_id');
        $category = $request->input('category');

        // Handle file uploads
        $fileFields = ['logo' => 'logo_path', 'headshot' => 'headshot_path', 'cv' => 'cv_path'];
        foreach ($fileFields as $fileKey => $dbField) {
            if ($request->hasFile($fileKey)) {
                $data[$dbField] = $request->file($fileKey)->store($fileKey, 'public');
            }
        }

        // Handle JSON strings (only if they came as strings from FormData)
        $jsonFields = ['practice_type', 'specialties', 'ideal_audience', 'services', 'testimonials', 'website_goals', 'required_pages', 'social_links'];
        foreach ($jsonFields as $field) {
            if (isset($data[$field]) && is_string($data[$field])) {
                $decoded = json_decode($data[$field], true);
                if (json_last_error() === JSON_ERROR_NONE) $data[$field] = $decoded;
            }
        }

        $onboarding = Onboarding::updateOrCreate(
            ['user_id' => Auth::id(), 'stripe_charge_id' => $chargeId],
            $data
        );

        return response()->json([
            'message' => 'Progress saved successfully',
            'onboarding' => $onboarding
        ]);
    }
    /**
     * Update an onboarding record (Admin/Superadmin).
     */
    public function update(Request $request, $id)
    {
        $onboarding = Onboarding::findOrFail($id);
        
        // Simple update for any field provided
        $onboarding->update($request->all());

        return response()->json([
            'message' => 'Onboarding record updated successfully',
            'onboarding' => $onboarding
        ]);
    }
}
