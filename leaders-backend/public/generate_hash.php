<?php
header('Content-Type: text/plain');
$hash = password_hash('Admin123@globa!!', PASSWORD_BCRYPT, ['cost' => 12]);
echo "Hash written: " . $hash;
