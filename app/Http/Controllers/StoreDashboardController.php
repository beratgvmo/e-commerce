<?php

namespace App\Http\Controllers;

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

        $storeProducts = Product::where("store_id", $storeId)->get();

        $totalViews = 0;

        foreach ($storeProducts as $product) {
            $totalViews += $product->views()->count();
        }

        $startMonth = Carbon::now('Europe/Istanbul')->subMonths(11)->startOfMonth();
        $endMonth = Carbon::now('Europe/Istanbul')->endOfMonth();
        $months = [];
        $monthlySalesData = [];

        while ($startMonth <= $endMonth) {
            $months[] = $startMonth->locale('tr')->translatedFormat('F');
            $monthlySalesData[] = $this->getSalesForMonth($startMonth, $storeId);
            $startMonth->addMonth();
        }

        $startDay = Carbon::now('Europe/Istanbul')->startOfMonth();
        $endDay = Carbon::now('Europe/Istanbul')->endOfMonth();
        $days = [];
        $dailySalesData = [];

        while ($startDay <= $endDay) {
            $days[] = $startDay->day;
            $dailySalesData[] = $this->getSalesForDay($startDay, $storeId);
            $startDay->addDay();
        }

        $hours = range(0, 23);
        $hourlySalesData = [];
        foreach ($hours as $hour) {
            $hourlySalesData[] = $this->getSalesForHour($hour, $storeId);
        }

        $startMonth = Carbon::now('Europe/Istanbul')->subMonths(11)->startOfMonth();
        $endMonth = Carbon::now('Europe/Istanbul')->endOfMonth();

        $monthlyIncrease = round(($monthlySalesData[11] / $monthlySalesData[10]) * 100 - 100);

        $yesterdaySales = $this->getSalesForDay(Carbon::yesterday('Europe/Istanbul'), $storeId);
        $dailyIncrease = $yesterdaySales > 0 ? round(($todaySales / $yesterdaySales) * 100 - 100) : 0;

        return Inertia::render('Store/Dashboard', [
            'todaySales' => $todaySales,
            'productCount' => $productCount,
            'monthlySalesData' => $monthlySalesData,
            'months' => $months,
            'dailySalesData' => $dailySalesData,
            'days' => $days,
            'hourlySalesData' => $hourlySalesData,
            'hours' => $hours,
            'orders' => $orders,
            'monthlyIncrease' => $monthlyIncrease,
            'totalViews' => $totalViews,
            'dailyIncrease' => $dailyIncrease
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

    private function getSalesForDay($date, $storeId)
    {
        return Order::where('status', 'Teslim edildi')
            ->where('store_id', $storeId)
            ->whereDate('created_at', $date->toDateString())
            ->sum('total_amount');
    }

    private function getSalesForHour($hour, $storeId)
    {
        return Order::where('status', 'Teslim edildi')
            ->where('store_id', $storeId)
            ->whereDate('created_at', Carbon::now('Europe/Istanbul')->toDateString())
            ->whereTime('created_at', '>=', sprintf('%02d:00:00', $hour))
            ->whereTime('created_at', '<', sprintf('%02d:00:00', $hour + 1))
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
