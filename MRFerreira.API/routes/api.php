<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    AuthController,
    CardController,
    ProductController,
    ContactController,
    Category\CategoryController,
    Provider\ProviderController,
    User\UserController,
    Provider\ProductController as ProviderProductController,
    Category\ProductController as CategoryProductController
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

Route::post('/admin/register', [AuthController::class, 'register']);
Route::post('/admin/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/me', [AuthController::class, 'me']);
    Route::post('/admin/logout', [AuthController::class, 'logout']);

    Route::prefix('/users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        
        Route::prefix('/{user}')->group(function () {
            Route::get('/', [UserController::class, 'show']);
            Route::patch('/', [UserController::class, 'patch']);
            Route::delete('/', [UserController::class, 'destroy']);
        });
    });

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

    Route::get('/cards', [CardController::class, 'index']);
});

# Public Routes
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

Route::get('/providers/{provider}/products', [ProviderProductController::class, 'index']);
Route::get('/categories/{category}/products', [CategoryProductController::class, 'index']);

Route::post('/send-email', [ContactController::class, 'sendEmail']);
