<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('category')->nullable(); // healthcare, tech, business, etc.
            $table->string('status')->default('pending'); // pending, active, completed
            $table->string('stripe_customer_id')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); // Link to user when account is created
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
