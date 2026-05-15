<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name, // ✅ corrigé : name pas nom
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        return response()->json([
            'token' => Str::random(60),
            'user' => $user
        ], 201);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        return response()->json([
            'token' => Str::random(60),
            'role' => $user->role,
            'user' => $user,
            'nom' => $user->name // ✅ on renvoie 'nom' pour qu'Assia soit contente aussi
        ]);
    }
    public function changePassword(Request $request)
{
    $request->validate([
        'ancien_password'  => 'required',
        'nouveau_password' => 'required|min:6',
    ]);

    // ✅ Récupérer le user via le token manuellement
    $token = $request->bearerToken();
    $pat   = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
    
    if (!$pat) {
        return response()->json(['message' => 'Non authentifié'], 401);
    }

    $user = $pat->tokenable;

    if (!Hash::check($request->ancien_password, $user->password)) {
        return response()->json(['message' => 'Ancien mot de passe incorrect'], 401);
    }

    $user->update([
        'password' => Hash::make($request->nouveau_password)
    ]);

    return response()->json(['message' => 'Mot de passe modifié avec succès']);
}
}