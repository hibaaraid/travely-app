<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = [
    'titre',
    'description',
    'prix',
    'categorie',
    'image',
    'duree',
    'date_depart',
    'places_disponibles',
];
}