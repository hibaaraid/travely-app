<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'destination_id',
        'date_depart',        // ✅ Ajouté
        'nombre_personnes',   // ✅ Ajouté
        'statut',
        'message',            // ✅ Ajouté
    ];

    public $timestamps = true;

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}