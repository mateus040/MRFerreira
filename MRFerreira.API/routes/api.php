<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    ProductsController,
    CategoriesController,
    AuthController,
    ContactController,
    ProvidersController,
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
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/providers/add', [ProvidersController::class, 'store']);
    Route::put('/providers/update/{id}', [ProvidersController::class, 'update']);
    Route::delete('/providers/delete/{id}', [ProvidersController::class, 'destroy']);


    Route::post('/products/add', [ProductsController::class, 'store']);
    Route::put('/products/update/{id}', [ProductsController::class, 'update']);
    Route::delete('/products/delete/{id}', [ProductsController::class, 'destroy']);

    Route::post('/categories/add', [CategoriesController::class, 'store']);
    Route::put('/categories/update/{id}', [CategoriesController::class, 'update']);
    Route::delete('/categories/delete/{id}', [CategoriesController::class, 'destroy']);

    Route::get('/cards', [ProductsController::class, 'getCards']);
});

Route::get('/providers/{id}/products', [ProductsController::class, 'productsByCompany']);
Route::get('/category/{id}', [ProductsController::class, 'productsByCategory']);

Route::get('/providers', [ProvidersController::class, 'index']);
Route::get('/providers/{id}', [ProvidersController::class, 'show']);

Route::get('/products', [ProductsController::class, 'index']);
Route::get('/products/{id}', [ProductsController::class, 'show']);

Route::get('/categories', [CategoriesController::class, 'index']);
Route::get('/categories/{id}', [CategoriesController::class, 'show']);

Route::post('/send-email', [ContactController::class, 'sendEmail']);
