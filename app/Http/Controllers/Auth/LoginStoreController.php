<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class LoginStoreController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/StoreLogin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::guard('store')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended(route('store.dashboard', absolute: false));
        }

        return back()->withErrors([
            'email' => 'Sağlanan kimlik bilgileri kayıtlarımızla eşleşmiyor.',
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('store')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/store-login');
    }
}
