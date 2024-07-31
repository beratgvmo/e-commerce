<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\Store;
use App\Models\StoreBanner;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class StoreDashboardController extends Controller
{

    public function index()
    {
        $storeId = Auth::guard('store')->user()->id;
        $productCount = Product::where('store_id', $storeId)->count();
        $todaySales = $this->getTodaySales($storeId);
        $orders = Order::where('status', 'Sipariş Alındı')->where('store_id', $storeId)->count();

        $startMonth = Carbon::now()->subMonths(11)->startOfMonth();
        $endMonth = Carbon::now()->endOfMonth();
        $months = [];
        $salesData = [];

        while ($startMonth <= $endMonth) {
            $startMonth->setLocale('tr');
            $months[] = $startMonth->translatedFormat('F');
            $salesData[] = $this->getSalesForMonth($startMonth, $storeId);
            $startMonth->addMonth();
        }

        $monthlyIncrease = round(($salesData[11] / $salesData[10]) * 100 - 100);

        return Inertia::render('Store/Dashboard', [
            'todaySales' => $todaySales,
            'productCount' => $productCount,
            'salesData' => $salesData,
            'months' => $months,
            'orders' => $orders,
            'monthlyIncrease' => $monthlyIncrease
        ]);
    }

    private function getTodaySales($storeId)
    {
        return Order::where('status', 'Teslim edildi')
            ->where('store_id', $storeId)
            ->whereDate('created_at', Carbon::now('Europe/Istanbul')->toDateString())
            ->sum('total_amount');
    }

    private function getSalesForMonth($date, $storeId)
    {
        return Order::where('status', 'Teslim edildi')
            ->where('store_id', $storeId)
            ->whereYear('created_at', $date->year)
            ->whereMonth('created_at', $date->month)
            ->sum('total_amount');
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

        return redirect()->back()->with('success', 'Sub-banner güncellendi.');
    }

    public function deleteSubBanner($id)
    {
        $subBanner = StoreBanner::where('id', $id)->where('store_id', Auth::user()->id)->firstOrFail();

        Storage::disk('public')->delete($this->getRelativePath($subBanner->img));

        $subBanner->delete();

        return redirect()->back()->with('success', 'Sub-banner silindi.');
    }
}
