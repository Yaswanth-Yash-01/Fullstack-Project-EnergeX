<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }


        if ($user->role !== $role && !($user->role === 'admin' && $role === 'user')) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}