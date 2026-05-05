<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    // Autorise Laravel à remplir ces colonnes
    protected $fillable = ['user_id', 'destination_id', 'statut', 'date_reservation'];

    // Indispensable : ta table n'a pas 'created_at' et 'updated_at'
    public $timestamps = false; 

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}