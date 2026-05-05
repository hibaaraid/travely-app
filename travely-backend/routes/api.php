<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Models\Destination;
use App\Models\Reservation;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ─── ROUTES PUBLIQUES (Accessibles par React sans connexion) ───
// Ces routes permettent de voir les voyages et de s'inscrire
\Route::get('/destinations', [DestinationController::class, 'index']);
\Route::get('/destinations/{id}', [DestinationController::class, 'show']);

// Authentification
\Route::post('/register', [AuthController::class, 'register']);
\Route::post('/login', [AuthController::class, 'login'])->name('login');


// ─── ROUTES PROTÉGÉES (Logique métier et Admin) ───
// Note : 'api' est utilisé car vous gérez les tokens manuellement dans AuthController
\Route::middleware('api')->group(function () {

    // Déconnexion
    \Route::post('/logout', [AuthController::class, 'logout']);

    // --- Espace Utilisateur (Réservations) ---
    \Route::get('/reservations',         [ReservationController::class, 'index']);
    \Route::post('/reservations',        [ReservationController::class, 'store']);
    \Route::put('/reservations/{id}',    [ReservationController::class, 'update']);
    \Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);

    // --- Espace Admin : Statistiques ---
    \Route::get('/admin/stats', function() {
        return response()->json([
            'nb_voyages'      => Destination::count(),
            'nb_reservations' => Reservation::count(),
            'nb_users'        => User::count()
        ]);
    });

    // --- Espace Admin : Gestion des Destinations ---
    \Route::post('/destinations',        [DestinationController::class, 'store']);
    \Route::put('/destinations/{id}',    [DestinationController::class, 'update']);
    \Route::delete('/destinations/{id}', [DestinationController::class, 'destroy']);
    
    // --- Espace Admin : Gestion des Utilisateurs ---
    \Route::get('/admin/reservations',   [ReservationController::class, 'adminIndex']);
    \Route::get('/admin/users',          [UserController::class, 'index']);
    \Route::put('/admin/users/{id}/role', [UserController::class, 'updateRole']);
    \Route::delete('/admin/users/{id}',   [UserController::class, 'destroy']);
});


// ─── GESTION DES ERREURS ───
// Toujours placer le fallback en dernier pour capturer les URLs inexistantes
\Route::fallback(function() {
    return response()->json(['message' => 'Route non trouvée sur le serveur Travely'], 404);
});