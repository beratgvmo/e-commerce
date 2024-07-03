<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rules;
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

    //     $store = Store::create([
    //         'name_surname' => $request->name_surname,
    //         'store_name' => $request->store_name,
    //         'email' => $request->email,
    //         'phone_number' => $request->phone_number,
    //         'city' => $request->city,
    //         'password' => Hash::make($request->password),
    //     ]);

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name_surname' => 'required|string|max:60',
            'store_name' => 'required|string|max:25|unique:stores',
            'email' => 'required|string|email|max:255|unique:stores',
            'phone_number' => 'required|string|max:11',
            'city' => 'required|string|max:50',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'selling_category_id' => 'required|exists:categories,id',
            'img' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            "color" => 'required|string',
        ]);

        if ($request->hasFile('img')) {
            $imagePath = $request->file('img')->store('public/images');
            $imageUrl = Storage::url($imagePath);
        } else {
            return back()->withInput()->withErrors(['img' => 'Please upload an image']);
        }

        // Slug creation
        $slug = Str::slug($request->store_name, '-');

        $store = Store::create([
            'name_surname' => $request->name_surname,
            'store_name' => $request->store_name,
            'phone_number' => $request->phone_number,
            'city' => $request->city,
            'district' => $request->district,
            'selling_category_id' => $request->selling_category,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'img' => $imageUrl,
            "color" => $request->color,
            "slug" => $slug,
        ]);

        event(new Registered($store));

        Auth::login($store);

        return redirect(route('dashboard', absolute: false));
    }
}
