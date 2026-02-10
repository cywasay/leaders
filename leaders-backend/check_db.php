<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$email = 'gz2750114@gmail.com';
$customer = \App\Models\Customer::where('email', $email)->first();

if ($customer) {
    echo "FOUND: ID " . $customer->id . " Name: " . $customer->name;
} else {
    echo "NOT FOUND in customers table";
}
echo "\n";
