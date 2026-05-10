<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    // Colonnes que Laravel peut remplir
    protected $fillable = ['user_id', 'destination_id', 'statut'];

    // Laravel gère automatiquement created_at et updated_at
    public $timestamps = true;

    // Relation : une réservation appartient à une destination
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    // Relation : une réservation appartient à un user ✅ ajoutée
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}