<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Onboarding;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SpeakerUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create/Update speaker user
        $user = User::updateOrCreate(
            ['email' => 'speaker@leaders.com'],
            [
                'name' => 'John Speaker',
                'password' => Hash::make('password'),
                'role' => 'speaker',
            ]
        );
        // Clear his onboarding so it's fresh
        Onboarding::where('user_id', $user->id)->delete();

        // Remove the redundant plural user if it exists
        User::where('email', 'speakers@leaders.com')->delete();
        
        echo "Speaker user created and redundant user removed.\n";
    }
}
