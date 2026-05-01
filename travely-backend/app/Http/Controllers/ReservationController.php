// Toutes les réservations pour l'admin (avec les noms)
public function adminIndex() {
    $reservations = Reservation::with(['user', 'destination'])->get();
    return response()->json($reservations->map(function($r) {
        return [
            'id'                 => $r->id,
            'statut'             => $r->statut,
            'nombre_personnes'   => $r->nombre_personnes,
            'date_depart'        => $r->date_depart,
            'user_name'          => $r->user->name ?? 'Inconnu',
            'destination_titre'  => $r->destination->titre ?? 'Inconnu',
        ];
    }));
}