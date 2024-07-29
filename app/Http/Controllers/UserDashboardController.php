<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
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
                ];
            })
            ->values();

        $products = Product::with("images")->get();

        return Inertia::render("Cart", [
            "carts" => $carts,
            'products' => $products,
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        if (!Auth::user()) {
            return redirect()->route('login');
        }

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

        if (!Auth::user()) {
            return redirect()->route('login');
        }

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

        if (!Auth::user()) {
            return redirect()->route('login');
        }

        Cart::where('user_id', Auth::user()->id)
            ->where('product_id', $request->product_id)
            ->delete();

        return redirect()->route('user.cart')->with([
            'message' => "Ürün Sepetten Kaldırıldı",
            'type' => 'success',
        ]);
    }
}
