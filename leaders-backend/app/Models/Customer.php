<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    protected $fillable = [
        'email',
        'name',
        'phone',
        'category',
        'status',
        'stripe_customer_id',
        'user_id',
    ];

    /**
     * Get the user associated with this customer
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
