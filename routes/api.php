<?php

use App\Http\Controllers\Api\CatController;
use App\Http\Controllers\Api\AdoptionController;
use App\Http\Controllers\Api\IncidentController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\FinanceController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\AnalyticsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/cats', [CatController::class, 'index']);
Route::post('/cats', [CatController::class, 'store']);
Route::get('/cats/{id}', [CatController::class, 'show']);
Route::put('/cats/{id}', [CatController::class, 'update']);
Route::delete('/cats/{id}', [CatController::class, 'destroy']);
Route::get('/adoptions', [AdoptionController::class, 'index']);
Route::post('/adoptions', [AdoptionController::class, 'store']);
Route::middleware('auth:sanctum')->get('/user/adoptions', [AdoptionController::class, 'getUserAdoptions']);
Route::get('/adoptions/{id}', [AdoptionController::class, 'show']);
Route::put('/adoptions/{id}', [AdoptionController::class, 'update']);
Route::get('/incidents', [IncidentController::class, 'index']);
Route::apiResource('events', EventController::class);

Route::get('/finances', [FinanceController::class, 'index']);
Route::get('/messages', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);
Route::get('/analytics', [AnalyticsController::class, 'index']);

Route::middleware('auth:sanctum')->put('/user/theme', [\App\Http\Controllers\Api\UserController::class, 'updateTheme']);
Route::middleware('auth:sanctum')->post('/user/profile', [\App\Http\Controllers\Api\UserController::class, 'updateProfile']);

Route::get('/debug-session', function (Request $request) {
    return [
        'session_id' => $request->session()->getId(),
        'user' => $request->user(),
        'config_session_driver' => config('session.driver'),
        'config_session_domain' => config('session.domain'),
        'config_session_secure' => config('session.secure'),
        'config_sanctum_stateful' => config('sanctum.stateful'),
    ];
});