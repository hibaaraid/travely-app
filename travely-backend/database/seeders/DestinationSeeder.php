<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = [
            [
                'titre'       => 'Marrakech',
                'description' => 'La ville rouge, entre médina historique et jardins luxuriants.',
                'prix'        => 1500,
                'categorie'   => 'maroc',
                'image'       => 'https://picsum.photos/400/300?random=1',
                'duree'       => '3 jours',
            ],
            [
                'titre'       => 'Agadir',
                'description' => 'Plages dorées et soleil toute l\'année.',
                'prix'        => 1200,
                'categorie'   => 'maroc',
                'image'       => 'https://picsum.photos/400/300?random=2',
                'duree'       => '5 jours',
            ],
            [
                'titre'       => 'Fès',
                'description' => 'La ville impériale et sa médina millénaire.',
                'prix'        => 1300,
                'categorie'   => 'maroc',
                'image'       => 'https://picsum.photos/400/300?random=3',
                'duree'       => '4 jours',
            ],
            [
                'titre'       => 'Paris',
                'description' => 'La ville lumière, tour Eiffel et gastronomie.',
                'prix'        => 4500,
                'categorie'   => 'etranger',
                'image'       => 'https://picsum.photos/400/300?random=4',
                'duree'       => '7 jours',
            ],
            [
                'titre'       => 'Dubaï',
                'description' => 'Luxe, modernité et désert à perte de vue.',
                'prix'        => 6500,
                'categorie'   => 'etranger',
                'image'       => 'https://picsum.photos/400/300?random=5',
                'duree'       => '6 jours',
            ],
            [
                'titre'       => 'Package Tout Inclus Turquie',
                'description' => 'Vol + Hôtel 5 étoiles + Excursions inclus.',
                'prix'        => 7000,
                'categorie'   => 'package',
                'image'       => 'https://picsum.photos/400/300?random=6',
                'duree'       => '10 jours',
            ],
        ];

        foreach ($destinations as $dest) {
            Destination::create($dest);
        }
    }
}
