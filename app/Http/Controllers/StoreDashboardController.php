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
            'logo' => 'required|string',
        ]);

        $store = Store::where('id', Auth::user()->id)->firstOrFail();

        if ($store->logo) {
            Storage::disk('public')->delete($this->getRelativePath($store->logo));
        }

        $imageData = $request->input('logo');
        $imageData = str_replace('data:image/png;base64,', '', $imageData);
        $imageData = base64_decode($imageData);

        $imageName = uniqid() . '.png';
        $imagePath = 'images/' . $imageName;

        Storage::disk('public')->put($imagePath, $imageData);

        $store->update(['logo' => Storage::url($imagePath)]);

        return redirect()->back()->with('success', 'Logo güncellendi.');
    }

    public function storeBenner(Request $request)
    {
        $request->validate([
            'banner' => 'required|string',
        ]);

        $store = Store::where('id', Auth::user()->id)->firstOrFail();

        if ($store->banner) {
            Storage::disk('public')->delete($this->getRelativePath($store->banner));
        }

        $imageData = $request->input('banner');
        $imageData = str_replace('data:image/png;base64,', '', $imageData);
        $imageData = base64_decode($imageData);

        $imageName = uniqid() . '.png';
        $imagePath = 'images/' . $imageName;

        Storage::disk('public')->put($imagePath, $imageData);

        $store->update(['banner' => Storage::url($imagePath)]);

        return redirect()->back()->with('success', 'banner güncellendi.');
    }

    private function getRelativePath($url)
    {
        return str_replace('/storage/', '', parse_url($url, PHP_URL_PATH));
    }
}
