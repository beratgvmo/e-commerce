<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfStore
{
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                return redirect()->route('store.dashboard');
            }
        }

        return $next($request);
    }
}
