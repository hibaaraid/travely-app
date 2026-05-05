<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    // On utilise 'nom' car c'est le nom de la colonne dans ton SQL
    protected $fillable = ['nom', 'email', 'password', 'role'];

    protected $hidden = ['password'];

    // Désactive les timestamps si tu n'as pas created_at/updated_at dans SQL
    public $timestamps = false; 
}