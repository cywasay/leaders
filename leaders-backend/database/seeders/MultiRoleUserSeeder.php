<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Onboarding;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MultiRoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'healthcare' => 'health@leaders.com',
            'tech' => 'tech@leaders.com',
            'business' => 'business@leaders.com',
            'impact' => 'impact@leaders.com',
            'research' => 'research@leaders.com',
        ];

        foreach ($roles as $role => $email) {
            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => ucfirst($role) . ' Leader',
                    'password' => Hash::make('password'),
                    'role' => $role,
                ]
            );
            
            // Clear onboarding so it's fresh for testing
            Onboarding::where('user_id', $user->id)->delete();
            
            echo "User created: {$email} (Role: {$role})\n";
        }
    }
}
