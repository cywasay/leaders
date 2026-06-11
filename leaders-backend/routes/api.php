<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\WooCommerceController;
use Illuminate\Http\Request;

Route::post('/login', [AuthController::class, 'login']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user', [AuthController::class, 'updateProfile']);

    Route::get('/onboarding', [OnboardingController::class, 'index']);
    Route::get('/onboarding/purchased-forms', [OnboardingController::class, 'getPurchasedForms']);
    Route::post('/onboarding', [OnboardingController::class, 'store']);
    Route::get('/orders', [WooCommerceController::class, 'getOrders']);
    
    // Superadmin Routes
    Route::middleware('role:superadmin')->group(function () {
        Route::get('/admin/customers', [\App\Http\Controllers\CustomerController::class, 'index']);
        Route::get('/admin/customers/{id}', [\App\Http\Controllers\CustomerController::class, 'show']);
        Route::put('/admin/customers/{id}', [\App\Http\Controllers\CustomerController::class, 'update']);
        Route::post('/admin/customers/{id}/create-account', [\App\Http\Controllers\CustomerController::class, 'createAccount']);
        Route::get('/admin/payments', [\App\Http\Controllers\PaymentController::class, 'index']);
        Route::get('/admin/stats', [\App\Http\Controllers\CustomerController::class, 'getStats']);
        Route::put('/onboarding/{id}', [OnboardingController::class, 'update']);
    });
});