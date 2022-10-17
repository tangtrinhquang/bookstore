<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthorController;
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
            'prefix' => 'user',
        ],
        function () {
            Route::post('/login', [UserController::class, 'login']);
            Route::post('/register', [UserController::class, 'register']);
            Route::post('/logout', [UserController::class, 'logout']);
            Route::post('/refresh-token', [UserController::class, 'refreshToken']);
            Route::get('/user-profile', [UserController::class, 'userProfile']);
            Route::post('/change-password', [UserController::class, 'changePassword']);
        }
    );

    Route::resource('author', AuthorController::class);
});
