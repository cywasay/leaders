<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Webhook;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeCredentialsMail;
use Spatie\Permission\Models\Role;

class StripeWebhookController extends Controller
{
    public function handle(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $payload = $request->getContent();
        $signature = $request->header('Stripe-Signature');
        $webhookSecret = config('services.stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent($payload, $signature, $webhookSecret);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid webhook'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            $email = $session->customer_details->email ?? null;
            $name  = $session->customer_details->name ?? 'User';
            
            // Try to get category from metadata first (more flexible)
            $category = $session->metadata->category ?? $session->metadata->product_id ?? null;
            $productId = $session->metadata->product_id ?? null;

            if (!$email) {
                return response()->json(['error' => 'Missing email'], 400);
            }

            // Fallback to mapping if metadata is not explicitly 'category'
            if (!$category || !in_array($category, ['healthcare', 'tech', 'business', 'impact', 'speaker', 'research'])) {
                $category = $this->mapProductToCategory($productId);
            }

            // Still null? Try description or just allow it
            if (!$category) {
                // We'll allow account creation even without category now
            }

            $plainPassword = Str::random(12);

            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'password' => Hash::make($plainPassword),
                    'role' => 'user',
                    'category' => $category,
                ]
            );

            // Update details if user exists
            if ($category && $user->category !== $category) {
                $user->category = $category;
            }
            $user->save();

            // Link to customer record if it exists
            $customer = \App\Models\Customer::where('email', $email)->first();
            if ($customer) {
                $customer->update([
                    'user_id' => $user->id,
                    'status' => 'active',
                    'category' => $category ?? $customer->category
                ]);
            }

            // Assign 'user' role via Spatie if available
            if (method_exists($user, 'assignRole')) {
                Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
                if (!$user->hasRole('user')) {
                    $user->assignRole('user');
                }
            }

            Mail::to($email)->send(new WelcomeCredentialsMail($user, $plainPassword));
        }

        return response()->json(['status' => 'success']);
    }

    private function mapProductToCategory($productId)
    {
        if (!$productId) return null;
        
        // Clean up prod_ prefix if present
        $cleanId = str_replace('prod_', '', strtolower($productId));
        
        $validCategories = ['healthcare', 'tech', 'business', 'impact', 'speaker', 'research'];
        if (in_array($cleanId, $validCategories)) {
            return $cleanId;
        }

        return match ($productId) {
            'prod_healthcare' => 'healthcare',
            'prod_tech' => 'tech',
            'prod_business' => 'business',
            'prod_impact' => 'impact',
            'prod_speaker' => 'speaker',
            'prod_research' => 'research',
            default => null
        };
    }
}
