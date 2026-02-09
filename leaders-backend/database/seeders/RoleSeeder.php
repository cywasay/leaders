<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate users table to start fresh
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create Superadmin
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@leaders.com',
            'password' => Hash::make('password'),
            'role' => 'superadmin',
        ]);

        // Create User Admin
        User::create([
            'name' => 'User Admin',
            'email' => 'useradmin@leaders.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
    }
}
