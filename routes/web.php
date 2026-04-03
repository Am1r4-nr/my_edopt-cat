<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(['guest:' . config('fortify.guard')]);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['guest:' . config('fortify.guard')]);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
