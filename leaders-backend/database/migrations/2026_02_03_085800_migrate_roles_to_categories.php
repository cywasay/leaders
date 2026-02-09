<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Step 1: Copy old role values to category column
        $categories = ['healthcare', 'tech', 'business', 'impact', 'speaker', 'research'];
        
        foreach ($categories as $category) {
            DB::table('users')
                ->where('role', $category)
                ->update([
                    'category' => $category,
                    'role' => 'user'
                ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Copy category back to role
        $categories = ['healthcare', 'tech', 'business', 'impact', 'speaker', 'research'];
        
        foreach ($categories as $category) {
            DB::table('users')
                ->where('category', $category)
                ->where('role', 'user')
                ->update([
                    'role' => $category
                ]);
        }
    }
};
