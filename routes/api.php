<?php

use App\Http\Controllers\Api\CatController;
use App\Http\Controllers\Api\AdoptionController;
use App\Http\Controllers\Api\IncidentController;
use App\Http\Controllers\Api\EventController;
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
Route::get('/adoptions/{id}', [AdoptionController::class, 'show']);
Route::put('/adoptions/{id}', [AdoptionController::class, 'update']);
Route::get('/incidents', [IncidentController::class, 'index']);
Route::apiResource('events', EventController::class);

Route::middleware('auth:sanctum')->put('/user/theme', [\App\Http\Controllers\Api\UserController::class, 'updateTheme']);