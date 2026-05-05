<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Exception;

class ReservationController extends Controller
{
    /**
     * Récupérer les réservations d'un utilisateur spécifique.
     * Utilisé pour l'affichage sur "Mon Tableau de Bord".
     */
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID manquant'], 400);
        }

        // On récupère les réservations avec les détails de la destination associée
        $reservations = Reservation::with('destination')
            ->where('user_id', $userId)
            ->get();

        return response()->json($reservations);
    }

    /**
     * Créer une nouvelle réservation.
     */
    public function store(Request $request)
    {
        // Validation basique des données entrantes
        $request->validate([
            'user_id' => 'required',
            'destination_id' => 'required',
        ]);

        try {
            // Création de la ligne dans la table 'reservations'
            $reservation = Reservation::create([
                'user_id' => $request->user_id,
                'destination_id' => $request->destination_id,
                'statut' => 'en attente', 
                'date_reservation' => now(),
            ]);

            return response()->json([
                'message' => 'Voyage réservé avec succès !',
                'data' => $reservation
            ], 201);

        } catch (Exception $e) {
            // CORRECTION : Utilisation de guillemets doubles pour éviter l'erreur de syntaxe sur l'apostrophe
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
}