<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Mail;

try {
    Mail::raw('Congrats! Your Leaders Admin email system is now LIVE and productive via Resend.', function ($msg) {
        $msg->to('gz2750114@gmail.com')
            ->subject('Leaders System Test');
    });
    echo "Test email sent successfully to gz2750114@gmail.com!\n";
} catch (\Exception $e) {
    echo "Failed to send: " . $e->getMessage() . "\n";
}
