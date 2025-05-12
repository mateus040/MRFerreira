<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    AuthController,
    ProductController,
    CategoryController,
    ContactController,
    ProviderController,
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('/categories')->group(function () {
        Route::post('/', [CategoryController::class, 'store']);

        Route::prefix('/{category}')->group(function () {
            Route::put('/', [CategoryController::class, 'update']);
            Route::delete('/', [CategoryController::class, 'destroy']);
        });
    });

    Route::prefix('/providers')->group(function () {
        Route::post('/', [ProviderController::class, 'store']);

        Route::prefix('/{provider}')->group(function () {
            Route::put('/', [ProviderController::class, 'update']);
            Route::delete('/', [ProviderController::class, 'destroy']);
        });
    });

    Route::prefix('/products')->group(function () {
        Route::post('/', [ProductController::class, 'store']);

        Route::prefix('/{product}')->group(function () {
            Route::put('/', [ProductController::class, 'update']);
            Route::delete('/', [ProductController::class, 'destroy']);
        });
    });

    Route::get('/cards', [ProductController::class, 'getCards']);
});

Route::prefix('/categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{category}', [CategoryController::class, 'show']);
});

Route::prefix('/products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{product}', [ProductController::class, 'show']);
});

Route::prefix('/providers')->group(function () {
    Route::get('/', [ProviderController::class, 'index']);
    Route::get('/{provider}', [ProviderController::class, 'show']);
});

Route::get('/providers/{id}/products', [ProductController::class, 'productsByCompany']);
Route::get('/categories/{id}/products', [ProductController::class, 'productsByCategory']);

Route::post('/send-email', [ContactController::class, 'sendEmail']);
