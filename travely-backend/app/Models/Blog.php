<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    // Déclare explicitement le nom de ta table si nécessaire
    protected $table = 'blogs';

    // Autorise Laravel à lire et écrire dans ces colonnes
    protected $fillable = [
        'titre', 
        'description', 
        'image', 
        'date_publication'
    ];
}
