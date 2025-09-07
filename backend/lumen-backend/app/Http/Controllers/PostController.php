<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;

class PostController extends BaseController
{

    public function index(Request $request)
    {
        $user = Auth::user();

        $posts = Post::where('user_id', $user->id)->get();

        return response()->json($posts);
    }


    public function store(Request $request)
    {
        $user = Auth::user();


        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        $post = Post::create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        return response()->json($post, 201);
    }
    public function show($id)
    {
        $user = Auth::user();

        $post = Post::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json($post);
    }
}
