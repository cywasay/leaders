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

        // Ensure roles exist in Spatie permission table
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'superadmin', 'guard_name' => 'web']);
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);

        // Create Superadmin
        $newPassword = 'Admin123@globa!!';
        $hashedPassword = Hash::make($newPassword);
        $this->command->info("Superadmin password hash: " . $hashedPassword);
        $superadmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@leaders.com',
            'password' => $hashedPassword,
            'role' => 'superadmin',
        ]);
        $superadmin->assignRole('superadmin');

        // Create User Admin
        $useradmin = User::create([
            'name' => 'User Admin',
            'email' => 'useradmin@leaders.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
        $useradmin->assignRole('user');
    }
}
