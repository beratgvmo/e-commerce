<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Store;
use App\Models\StoreFollow;
use App\Models\StoreFollower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function dashboard()
    {
        return Inertia::render("Dashboard");
    }

    public function cart()
    {
        $carts = Cart::where('user_id', Auth::user()->id)
            ->with('product.images', 'store')
            ->get()
            ->groupBy('store.id')
            ->map(function ($storeCarts) {
                $activeCarts = $storeCarts->where('is_active', true);

                $totalPrice = $activeCarts->sum(function ($cart) {
                    return $cart->product->price * $cart->quantity;
                });

                $shippingCost = ($totalPrice < 500 && $totalPrice > 0) ? 50 : 0;

                return [
                    'id' => $storeCarts->first()->store->id,
                    'storeName' => $storeCarts->first()->store->store_name,
                    'slug' => $storeCarts->first()->store->slug,
                    'storeRating' => $storeCarts->first()->store->store_rating,
                    'products' => $storeCarts->map(function ($cart) {
                        return [
                            'id' => $cart->id,
                            'quantity' => $cart->quantity,
                            'product' => $cart->product,
                            'is_active' => $cart->is_active,
                        ];
                    }),
                    'totalPrice' => $totalPrice,
                    'shippingCost' => $shippingCost,
                    'PriceShipping' => ($totalPrice < 500 && $totalPrice > 0) ? 500 - $totalPrice  : 0,
                ];
            })
            ->values();

        $totalPriceAll = $carts->sum('totalPrice');
        $totalShippingCost = $carts->sum('shippingCost');
        $grandTotalPrice = $totalPriceAll + $totalShippingCost;

        $totalProductCount = 0;

        foreach ($carts as $cart) {
            $totalProductCount += count($cart['products']);
        }


        $products = Product::with("images")->get();

        $cartCount = Cart::where('user_id', Auth::user()->id)
            ->where("is_active", true)
            ->count();

        return Inertia::render("Cart", [
            "carts" => $carts,
            "cartCount" => $cartCount,
            'products' => $products,
            'totalPriceAll' => $totalPriceAll,
            'totalShippingCost' => $totalShippingCost,
            'grandTotalPrice' => $grandTotalPrice,
            'totalProductCount' => $totalProductCount,
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $product = Product::findOrFail($request->product_id);

        Cart::updateOrCreate(
            [
                'user_id' => Auth::user()->id,
                'store_id' => $product->store_id,
                'product_id' => $product->id,
            ],
            [
                'quantity' => DB::raw('quantity + 1')
            ]
        );

        return redirect()->back()->with([
            'message' => "Sepet Başarıyla Güncellendi",
            'type' => 'success',
        ]);
    }

    public function reduceFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        Cart::where('user_id', Auth::user()->id)
            ->where('product_id', $request->product_id)
            ->where('quantity', '>', 1)
            ->decrement('quantity');

        return redirect()->back()->with([
            'message' => "Sepet Başarıyla Güncellendi",
            'type' => 'success',
        ]);
    }

    public function removeFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);


        Cart::where('user_id', Auth::user()->id)
            ->where('product_id', $request->product_id)
            ->delete();

        return redirect()->route('user.cart')->with([
            'message' => "Ürün Sepetten Kaldırıldı",
            'type' => 'success',
        ]);
    }

    public function activeCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $cart = Cart::where('user_id', Auth::user()->id)
            ->where('product_id', $request->product_id)->first();

        $cart->is_active = !$cart->is_active;
        $cart->save();

        return redirect()->route('user.cart')->with([
            'message' => "Sepet Başarıyla Güncellendi",
            'type' => 'success',
        ]);
    }

    public function payment()
    {
        return Inertia::render("Payment");
    }


    public function follow($storeId)
    {
        $follow = StoreFollower::where("user_id", Auth::user("user")->id)->where("store_id", $storeId)->first();
        $store = Store::find($storeId);

        if ($follow) {
            $follow->delete();
            $store->updateFollowersCount();
            return redirect()->back()->with([
                'message' => 'Mağaza Takipten Çık',
                'type' => 'success',
            ]);
        } else {
            StoreFollower::create([
                'user_id' => Auth::user("user")->id,
                'store_id' => $storeId
            ]);
            $store->updateFollowersCount();
            return redirect()->back()->with([
                'message' => 'Mağaza takip Ettiniz',
                'type' => 'success',
            ]);
        }
    }
}
