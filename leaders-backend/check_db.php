<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$email = 'gz2750114@gmail.com';
$customer = \App\Models\Customer::where('email', $email)->first();
$user = \App\Models\User::where('email', $email)->first();

if ($customer) {
    echo "CUSTOMER FOUND:\n";
    print_r($customer->toArray());
} else {
    echo "CUSTOMER NOT FOUND in customers table\n";
}

if ($user) {
    echo "USER FOUND:\n";
    print_r($user->toArray());
} else {
    echo "USER NOT FOUND in users table\n";
}
echo "\n";
