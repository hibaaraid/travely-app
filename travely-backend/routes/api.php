<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Destination;
use App\Models\Reservation;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\AuthController;

// ─── ROUTES PUBLIQUES (sans token) ────────────────────────
Route::get('/destinations', [DestinationController::class, 'index']);
Route::get('/destinations/{id}', [DestinationController::class, 'show']);

// ─── AUTHENTIFICATION ──────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login'); // ← une seule fois + name('login')

// ─── ROUTES PROTÉGÉES (avec token) ────────────────────────
Route::middleware('auth:api')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Stats Admin
    Route::get('/admin/stats', function() {
        return response()->json([
            'nb_voyages'      => Destination::count(),
            'nb_reservations' => Reservation::count(),
            'nb_users'        => User::count()
        ]);
    });

    // Réservations
    Route::get('/reservations',         [ReservationController::class, 'index']);
    Route::post('/reservations',        [ReservationController::class, 'store']);
    Route::put('/reservations/{id}',    [ReservationController::class, 'update']);
    Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);

    // CRUD Destinations (Admin)
    Route::post('/destinations',        [DestinationController::class, 'store']);
    Route::put('/destinations/{id}',    [DestinationController::class, 'update']);
    Route::delete('/destinations/{id}', [DestinationController::class, 'destroy']);
});

// ─── FALLBACK (toujours en dernier) ───────────────────────
Route::fallback(function() {
    return response()->json(['message' => 'Route non trouvée'], 404);
});
Route::get('/admin/reservations', [ReservationController::class, 'adminIndex']);

Route::get('/admin/users', [UserController::class, 'index']);
Route::put('/admin/users/{id}/role', [UserController::class, 'updateRole']);
Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);