<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PublisherController;


use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
    'middleware' => 'api',
], function () {
    Route::group(
        [
            'prefix' => 'auth',
        ],
        function () {
            Route::post('/register', [AuthenticationController::class, 'register']);
            Route::post('/login', [AuthenticationController::class, 'login']);
            Route::post('/refresh-token', [AuthenticationController::class, 'refreshToken']);
            Route::post('/logout', [AuthenticationController::class, 'logout']);
        }
    );
    Route::put('user/change-password', [UserController::class, 'changePassword']);

    Route::resource('book', BookController::class);

    Route::group([
        'middleware' => ['can:isAdmin']
    ], function () {
        Route::resource('user', UserController::class);
        Route::resource('author', AuthorController::class);
        Route::resource('genre', GenreController::class);
        Route::resource('publisher', PublisherController::class);
        Route::resource('order', OrderController::class);
    });
});
