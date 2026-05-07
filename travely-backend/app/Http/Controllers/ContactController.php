<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Recevoir un message (public)
    public function store(Request $request)
    {
        $request->validate([
            'nom'     => 'required|string',
            'email'   => 'required|email',
            'sujet'   => 'required|string',
            'message' => 'required|string',
        ]);

        Contact::create($request->all());

        return response()->json([
            'message' => 'Message envoyé avec succès'
        ], 201);
    }

    // Lire tous les messages (admin)
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return response()->json($contacts);
    }

    // Marquer comme lu (admin)
    public function marquerLu($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['lu' => true]);
        return response()->json(['message' => 'Marqué comme lu']);
    }

    // Supprimer un message (admin)
    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();
        return response()->json(['message' => 'Message supprimé']);
    }
}
