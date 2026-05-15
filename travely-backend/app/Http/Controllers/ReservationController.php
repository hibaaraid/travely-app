<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Destination; // ✅ Import indispensable pour récupérer la date
use Exception;

class ReservationController extends Controller
{
    /**
     * Récupérer les réservations d'un utilisateur spécifique.
     */
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID manquant'], 400);
        }

        $reservations = Reservation::with('destination')
            ->where('user_id', $userId)
            ->get();

        return response()->json($reservations);
    }

    /**
     * Créer une nouvelle réservation.
     * La date est récupérée automatiquement depuis la destination.
     */
    public function store(Request $request)
    {
        // 1. Validation : On retire 'date_depart' car elle est automatique désormais
        $request->validate([
            'user_id' => 'required',
            'destination_id' => 'required',
            'nombre_personnes' => 'required|integer|min:1',
        ]);

        try {
            // 2. RÉCUPÉRATION AUTOMATIQUE DE LA DATE
            $destination = Destination::find($request->destination_id);

            if (!$destination) {
                return response()->json(['message' => 'Destination introuvable'], 404);
            }

            // 3. Création
            $reservation = Reservation::create([
                'user_id' => $request->user_id,
                'destination_id' => $request->destination_id,
                'date_depart' => $destination->date_depart, // ✅ Récupéré de la table Destination
                'nombre_personnes' => $request->nombre_personnes,
                'statut' => 'en_attente',
            ]);

            return response()->json([
                'message' => 'Voyage réservé avec succès !',
                'data' => $reservation
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Erreur lors de l'insertion en base de données",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une réservation
     */
    public function destroy($id)
    {
        $reservation = Reservation::find($id);
        if ($reservation) {
            $reservation->delete();
            return response()->json(['message' => 'Réservation annulée']);
        }
        return response()->json(['message' => 'Réservation introuvable'], 404);
    }

    /**
     * Administration : Liste de toutes les réservations
     */
    public function adminIndex()
    {
        $reservations = Reservation::with(['destination', 'user'])->get();
        
        $formatted = $reservations->map(function($res) {
            return [
                'id'               => $res->id,
                'user_name'        => $res->user->name ?? 'Inconnu',
                'destination_titre'=> $res->destination->titre ?? 'Inconnu',
                'date_depart'      => $res->date_depart,
                'nombre_personnes' => $res->nombre_personnes ?? 1,
                'statut'           => $res->statut,
            ];
        });

        return response()->json($formatted);
    }

    /**
     * Mettre à jour le statut (Confirmer/Refuser)
     */
    public function update(Request $request, $id)
    {
        $reservation = Reservation::find($id);
        
        if (!$reservation) {
            return response()->json(['message' => 'Réservation introuvable'], 404);
        }

        $reservation->statut = $request->statut;
        $reservation->save();

        return response()->json([
            'message' => 'Statut mis à jour',
            'data'    => $reservation
        ]);
    }
}