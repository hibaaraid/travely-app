<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = [
    'titre',
    'description',
    'description_longue',
    'prix',
    'categorie',
    'image',
    'duree',
    'date_depart',
    'places_disponibles',
];
}