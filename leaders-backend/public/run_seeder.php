<?php
header('Content-Type: text/plain');

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $exitCode = \Illuminate\Support\Facades\Artisan::call('db:seed', ['--class' => 'RoleSeeder']);
    $output = \Illuminate\Support\Facades\Artisan::output();
    echo "Exit Code: " . $exitCode . "\n";
    echo "Output:\n" . $output . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
