<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
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