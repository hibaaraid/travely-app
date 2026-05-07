<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->decimal('prix', 10, 2);
            $table->string('categorie');
            $table->string('image')->nullable();
            $table->string('duree')->nullable();
            $table->date('date_depart')->nullable();        // <- ajoute
            $table->integer('places_disponibles')->nullable(); // <- ajoute
            $table->string('role')->default('user');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};