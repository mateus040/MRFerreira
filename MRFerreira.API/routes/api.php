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

    Route::post('/providers/add', [ProviderController::class, 'store']);
    Route::put('/providers/update/{id}', [ProviderController::class, 'update']);
    Route::delete('/providers/delete/{id}', [ProviderController::class, 'destroy']);


    Route::post('/products/add', [ProductController::class, 'store']);
    Route::put('/products/update/{id}', [ProductController::class, 'update']);
    Route::delete('/products/delete/{id}', [ProductController::class, 'destroy']);

    Route::post('/categories/add', [CategoryController::class, 'store']);
    Route::put('/categories/update/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/delete/{id}', [CategoryController::class, 'destroy']);

    Route::get('/cards', [ProductController::class, 'getCards']);
});

Route::get('/providers/{id}/products', [ProductController::class, 'productsByCompany']);
Route::get('/category/{id}', [ProductController::class, 'productsByCategory']);

Route::get('/providers', [ProviderController::class, 'index']);
Route::get('/providers/{id}', [ProviderController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::post('/send-email', [ContactController::class, 'sendEmail']);
