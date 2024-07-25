<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Category;
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
        $carts = Cart::where("user_id", Auth::user()->id)->with("product.images", "store")->get(); // product resimleri al 

        return Inertia::render("Cart", [
            "carts" => $carts
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        if (!Auth::user()) {
            return redirect()->intended(route('login', absolute: false));
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

        return redirect()->back()->with('success', 'sepet güncellendi.');
    }


    public function reduceToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        if (!Auth::user()) {
            return redirect()->intended(route('login', absolute: false));
        }

        $cartItem = Cart::where([
            ['user_id', '=', Auth::id()],
            ['product_id', '=', $request->product_id],
        ])->first();

        if ($cartItem->quantity > 1) {
            $cartItem->quantity -= 1;
            $cartItem->save();
        }

        return redirect()->back()->with('success', 'sepet güncellendi.');
    }
}
