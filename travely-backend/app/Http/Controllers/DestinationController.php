<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;

class DestinationController extends Controller
{
    public function index() {
        return response()->json(Destination::all());
    }

    public function show($id) {
        return response()->json(Destination::findOrFail($id));
    }

    public function store(Request $request) {
    $data = $request->validate([
        'titre'              => 'required|string',
        'description'        => 'nullable|string',
        'description_longue' => 'nullable|string',
        'prix'               => 'required|numeric',
        'categorie'          => 'required|string',
        'date_depart'        => 'nullable|date',
        'places_disponibles' => 'nullable|integer',
        'duree' => 'nullable|string',
        'image'              => 'nullable|image|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('destinations', 'public');
        $data['image'] = '/storage/' . $path;
    }

    $destination = Destination::create($data);
    return response()->json($destination, 201);
}

public function update(Request $request, $id) {
    $destination = Destination::findOrFail($id);

    $data = $request->validate([
        'titre'              => 'sometimes|string',
        'description'        => 'nullable|string',
        'description_longue' => 'nullable|string',
        'prix'               => 'sometimes|numeric',
        'categorie'          => 'sometimes|string',
        'date_depart'        => 'nullable|date',
        'places_disponibles' => 'nullable|integer',
        'duree' => 'nullable|string',
        'image'              => 'nullable|image|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('destinations', 'public');
        $data['image'] = '/storage/' . $path;
    }

    $destination->update($data);
    return response()->json($destination);
}

    public function destroy($id) {
        Destination::findOrFail($id)->delete();
        return response()->json(['message' => 'Supprimé']);
    }
}