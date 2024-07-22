<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\StoreBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class StoreDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Store/Dashboard');
    }

    private function getRelativePath($url)
    {
        return str_replace('/storage/', '', parse_url($url, PHP_URL_PATH));
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

        $imageName = Str::random(40) . '.png';
        $imagePath = 'images/' . $imageName;

        Storage::disk('public')->put($imagePath, $imageData);

        $store->update(['logo' => Storage::url($imagePath)]);

        return redirect()->back()->with('success', 'Logo güncellendi.');
    }

    public function storeBanner(Request $request)
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

        $imageName = Str::random(40) . '.png';
        $imagePath = 'images/' . $imageName;

        Storage::disk('public')->put($imagePath, $imageData);

        $store->update(['banner' => Storage::url($imagePath)]);

        return redirect()->back()->with('success', 'Banner güncellendi.');
    }

    public function storeSubBanner(Request $request)
    {
        $request->validate([
            'subBanner' => 'required|string',
            'bannerSlug' => 'required|string|unique:store_banners,slug',
        ]);

        $imageData = $request->input('subBanner');
        $imageData = str_replace('data:image/png;base64,', '', $imageData);
        $imageData = base64_decode($imageData);

        $imageName = Str::random(40) . '.png';
        $imagePath = 'images/' . $imageName;

        Storage::disk('public')->put($imagePath, $imageData);

        StoreBanner::create([
            'store_id' => Auth::user()->id,
            'slug' => $request->input('bannerSlug'),
            'img' => Storage::url($imagePath),
        ]);

        return redirect()->back()->with('success', 'Sub-banner updated successfully.');
    }

    public function deleteSubBanner($id)
    {
        $subBanner = StoreBanner::where('id', $id)->where('store_id', Auth::user()->id)->firstOrFail();

        Storage::disk('public')->delete($this->getRelativePath($subBanner->img));

        $subBanner->delete();

        return redirect()->back()->with('success', 'Sub-banner deleted successfully.');
    }
}
