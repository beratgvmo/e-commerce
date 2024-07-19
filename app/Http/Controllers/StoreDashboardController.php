<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class StoreDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Store/Dashboard');
    }

    public function storeLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|string', // Expect a base64 encoded string
        ]);

        $store = Store::where('id', Auth::user()->id)->firstOrFail();

        if ($store->logo) {
            Storage::disk('public')->delete($store->logo);
        }

        $imageData = $request->input('logo');
        $imageData = str_replace('data:image/png;base64,', '', $imageData);
        $imageData = base64_decode($imageData);

        $imagePath = $imageData->store('public/images');
        $imageUrl = Storage::url($imagePath);


        $path = $request->file('logo')->store('public/images', 'public');
        $store->update(['logo' => $path]);

        return redirect()->route('home.magaza')->with('success', 'Logo yüklendi!');
    }
}
