<?php

use App\Http\Controllers\Api\CatController;
use App\Http\Controllers\Api\AdoptionController;
use App\Http\Controllers\Api\IncidentController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\VolunteerController;
use App\Http\Controllers\Api\Admin\DonationAdminController;
use App\Http\Controllers\Api\Admin\VolunteerAdminController;
use App\Http\Controllers\Api\Admin\AdminEventController;
use App\Http\Controllers\Api\GpsController;
use App\Http\Controllers\Api\Admin\AdminIncidentController;
use App\Http\Controllers\Api\Admin\AdminGpsController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::get('/cats', [CatController::class, 'index']);
Route::post('/cats', [CatController::class, 'store']);
Route::get('/cats/{id}', [CatController::class, 'show']);
Route::put('/cats/{id}', [CatController::class, 'update']);
Route::delete('/cats/{id}', [CatController::class, 'destroy']);
Route::get('/adoptions', [AdoptionController::class, 'index']);
Route::get('/adoptions/{id}', [AdoptionController::class, 'show']);
Route::put('/adoptions/{id}', [AdoptionController::class, 'update']);
Route::get('/incidents', [IncidentController::class, 'index']);
Route::post('/incidents', [IncidentController::class, 'store']);
Route::get('/gps/search', [GpsController::class, 'search']);

// Public Events
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);
Route::post('/events/{event}/register', [EventController::class, 'register']);

// Public Donations
Route::get('/donation-cases', [DonationController::class, 'index']);
Route::post('/donate', [DonationController::class, 'donate']);
Route::match(['get', 'post'], '/donate/callback', [DonationController::class, 'callback']);
Route::get('/donate/mock-payment', [DonationController::class, 'mockPayment']);

// Admin Protected Routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/donations', [DonationAdminController::class, 'index']);
    Route::post('/admin/donation-cases/{id}/mark-funded', [DonationAdminController::class, 'markAsFunded']);
    
    Route::get('/admin/volunteers', [VolunteerAdminController::class, 'index']);
    Route::post('/admin/volunteers/{id}/review', [VolunteerAdminController::class, 'review']);
    
    Route::apiResource('admin/events', AdminEventController::class);
    Route::get('/admin/events/{event}/attendees', [AdminEventController::class, 'attendees']);
    
    Route::get('/admin/incidents', [AdminIncidentController::class, 'index']);
    Route::post('/admin/incidents/{incident}/mark-in-progress', [AdminIncidentController::class, 'markInProgress']);
    Route::post('/admin/incidents/{incident}/mark-resolved', [AdminIncidentController::class, 'markResolved']);
    
    Route::get('/admin/gps', [AdminGpsController::class, 'index']);
    Route::post('/admin/gps/log', [AdminGpsController::class, 'log']);
});

// User Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/user/theme', [\App\Http\Controllers\Api\UserController::class, 'updateTheme']);
    
    Route::post('/volunteer/apply', [VolunteerController::class, 'apply']);
    Route::get('/volunteer/dashboard', [VolunteerController::class, 'dashboard']);
    Route::post('/volunteer/activities', [VolunteerController::class, 'logActivity']);
});