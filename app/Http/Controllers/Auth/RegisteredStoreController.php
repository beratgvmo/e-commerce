<?php
// app/Http/Controllers/Auth/RegisteredStoreController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegisterRequest;
use App\Models\Category;
use App\Models\Store;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RegisteredStoreController extends Controller
{
    public function create(): Response
    {
        $categories = Category::all();

        return Inertia::render('Auth/StoreRegister', [
            'categories' => $categories
        ]);
    }

    public function store(StoreRegisterRequest $request): RedirectResponse
    {
        $slug = Str::slug($request->store_name, '-');

        if ($request->hasFile('img')) {
            $imagePath = $request->file('img')->store('public/images');
            $imageUrl = Storage::url($imagePath);
        } else {
            return back()->withInput()->withErrors(['img' => 'Please upload an image']);
        }

        $store = Store::create([
            'name_surname' => $request->name_surname,
            'store_name' => $request->store_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'city' => $request->city,
            'password' => Hash::make($request->password),
            'selling_category_id' => $request->selling_category_id,
            'img' => $imageUrl,
            'color' => $request->color,
            'slug' => $slug
        ]);

        event(new Registered($store));

        Auth::guard('store')->login($store);

        return redirect(route('store.dashboard'));
    }
}
