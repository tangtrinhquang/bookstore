<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\UserController;
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
            Route::post('/login', [AuthenticationController::class, 'login']);
            Route::post('/register', [AuthenticationController::class, 'register']);
            Route::post('/logout', [AuthenticationController::class, 'logout']);
            Route::post('/refresh-token', [AuthenticationController::class, 'refreshToken']);
            Route::get('/user-profile', [AuthenticationController::class, 'userProfile']);
            Route::post('/change-password', [AuthenticationController::class, 'changePassword']);
        }
    );
    Route::group([
        'middleware' => ['can:isAdmin']
    ], function () {
        Route::resource('', UserController::class)->middleware('can:isAdmin');
        Route::resource('author', AuthorController::class)->middleware('can:isAdmin');
    });
});
