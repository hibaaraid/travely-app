<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        // On récupère simplement tous les articles pour tester
        return response()->json(Blog::all());
    }

    public function show($id)
    {
        $article = Blog::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }
        return response()->json($article);
    }
}
