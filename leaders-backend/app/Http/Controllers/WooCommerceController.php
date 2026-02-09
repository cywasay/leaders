<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class WooCommerceController extends Controller
{
    /**
     * Fetch orders for the current user from WordPress.
     */
    public function getOrders()
    {
        $user = Auth::user();
        
        // Get settings from .env
        $url = env('WC_STORE_URL') . '/wp-json/wc/v3/orders';
        $key = env('WC_CONSUMER_KEY');
        $secret = env('WC_CONSUMER_SECRET');

        try {
            // Call the WooCommerce API
            $response = Http::withBasicAuth($key, $secret)
                ->get($url, [
                    'email' => $user->email, // Filter orders by the user's email
                    'status' => 'completed',  // Only show paid orders
                ]);

            if ($response->successful()) {
                return response()->json([
                    'orders' => $response->json(),
                ]);
            }

            return response()->json([
                'message' => 'Failed to fetch orders from WordPress',
                'error' => $response->body()
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error connecting to WordPress',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
