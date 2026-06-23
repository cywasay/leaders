<?php
$hash = password_hash('Admin123@globa!!', PASSWORD_BCRYPT, ['cost' => 12]);
file_put_contents(__DIR__ . '/hash.txt', $hash);
echo "Hash written: " . $hash;
