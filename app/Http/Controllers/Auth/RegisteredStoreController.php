<?php
// app/Http/Controllers/Auth/RegisteredStoreController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegisterRequest;
use App\Models\CargoCompany;
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
        $cargoCompanies = CargoCompany::all();

        return Inertia::render('Auth/StoreRegister', [
            'categories' => $categories,
            'cargoCompanies' => $cargoCompanies
        ]);
    }

    public function store(StoreRegisterRequest $request): RedirectResponse
    {
        $slug = Str::slug($request->store_name, '-');


        $store = Store::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'store_name' => $request->store_name,
            'email' => $request->email,
            'slug' => $slug,
            'phone_number' => $request->phone_number,
            'iban_no' => $request->iban_no,
            'city' => $request->city,
            'address' => $request->address,
            'cargo_company' => $request->cargo_company,
            'selling_category_id' => $request->selling_category_id,
            'cargo_companies_id' => $request->cargo_companies_id,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($store));

        Auth::guard('store')->login($store);

        return redirect(route('store.dashboard'));
    }
}
