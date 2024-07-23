<?php

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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class RegisteredStoreController extends Controller
{
    public function create(): Response
    {
        $categories = Category::all();
        $cargoCompanies = CargoCompany::all();

        return Inertia::render('Auth/StoreRegister', [
            'categories' => $categories,
            'cargoCompanies' => $cargoCompanies,
        ]);
    }

    public function checkStoreName(Request $request)
    {
        $request->validate([
            'store_name' => 'required|string|min:5|max:30',
        ]);

        $isUnique = !Store::where('store_name', $request->store_name)->exists();

        return response()->json(['unique' => $isUnique]);
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
            'selling_category_id' => $request->selling_category_id,
            'cargo_companies_id' => $request->cargo_companies_id,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($store));

        Auth::guard('store')->login($store);

        return redirect(route('store.dashboard'));
    }
}
