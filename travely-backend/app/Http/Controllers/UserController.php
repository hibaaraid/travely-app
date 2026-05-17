<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash; // Import nécessaire pour le mot de passe
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // --- NOUVELLE MÉTHODE : INSCRIPTION ---
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:4',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $user = User::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hachage sécurisé
            'role' => 'user', // Rôle par défaut
        ]);

        return response()->json([
            'message' => 'Compte créé avec succès !',
            'user' => $user
        ], 201);
    }

    // --- MÉTHODES EXISTANTES ---
    public function index() {
        return response()->json(User::all());
    }

    public function updateRole(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();
        return response()->json($user);
    }

    public function destroy($id) {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    }

    public function stats() {
        return response()->json([
            'nb_voyages'      => \App\Models\Destination::count(),
            'nb_reservations' => \App\Models\Reservation::count(),
            'nb_users'        => User::count(),
        ]);
    }
}