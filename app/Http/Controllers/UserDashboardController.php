<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\CargoCompany;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
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
        $carts = Cart::where('user_id', Auth::user()->id)->where('is_active', true)
            ->with('product.images', 'store')
            ->get()
            ->groupBy('store.id')
            ->map(function ($storeCarts) {
                $totalPrice = $storeCarts->sum(function ($cart) {
                    return $cart->product->price * $cart->quantity;
                });

                $store = $storeCarts->first()->store;

                $shippingCost = ($totalPrice < 500 && $totalPrice > 0) ? $this->calculateShippingCost($store->cargo_companies_id) : 0;

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
                ];
            })
            ->values();

        $totalPriceAll = $carts->sum('totalPrice');
        $totalShippingCost = $carts->sum('shippingCost');
        $grandTotalPrice = $totalPriceAll + $totalShippingCost;

        $addressList = Address::where("user_id", Auth::user()->id)->get();

        $products = Product::with("images")->get();

        return Inertia::render("Payment", [
            "carts" => $carts,
            'products' => $products,
            'totalPriceAll' => $totalPriceAll,
            'totalShippingCost' => $totalShippingCost,
            'grandTotalPrice' => $grandTotalPrice,
            'addressList' => $addressList,
        ]);
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

    public function userAddresses(Request $request)
    {
        $rules = [
            'first_name' => 'required|string|max:30',
            'last_name' => 'required|string|max:30',
            'phone_number' => 'required|string|max:14',
            'city' => 'required',
            'address' => 'required|string|min:30',
            'address_name' => 'required|max:40',
        ];

        $messages = [
            'first_name.required' => 'Alıcı adı alanı zorunludur.',
            'first_name.string' => 'Alıcı adı sadece metin içermelidir.',
            'first_name.max' => 'Alıcı adı 60 karakterden fazla olamaz.',

            'last_name.required' => 'Alıcı soyad alanı zorunludur.',
            'last_name.string' => 'Alıcı soyad sadece metin içermelidir.',
            'last_name.max' => 'Alıcı soyad 60 karakterden fazla olamaz.',

            'phone_number.required' => 'Telefon numarası alanı zorunludur.',
            'phone_number.max' => 'Telefon numarası 14 karakterden olmalı.',

            'city.required' => 'Şehir adı alanı zorunludur.',

            'address.required' => 'Adres alanı zorunludur.',
            'address.string' => 'Adres geçerli bir metin olmalıdır.',
            'address.min' => 'Adres metni en az 30 karakter uzunluğunda olmalıdır.',

            'address_name.required' => 'Adres adı alanı zorunludur.',
            'address_name.max' => 'Adres adı 40 karakterden fazla olamaz.',
        ];

        $request->validate($rules, $messages);

        Address::create([
            'user_id' => Auth::user()->id,
            'recipient_name' => $request->first_name . " " . $request->last_name,
            'phone_number' => $request->phone_number,
            'city' => $request->city,
            'address' => $request->address,
            'address_name' => $request->address_name
        ]);

        return redirect()->back()->with([
            'message' => 'Yeni adres ekledi',
            'type' => 'success',
        ]);
    }

    public function userProductOrder(Request $request)
    {
        $address = Address::where('user_id', Auth::user()->id)
            ->where('id', $request->redio)
            ->first();

        $cartItems = Cart::where('user_id', Auth::user()->id)
            ->where('is_active', 1)
            ->get()
            ->groupBy('store_id');

        foreach ($cartItems as $storeId => $items) {
            $totalAmount = $items->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });


            $shippingCost = ($totalAmount < 500 && $totalAmount > 0)
                ? $this->calculateShippingCost($items->first()->store->cargo_companies_id) : 0;

            $order = Order::create([
                'user_id' => $address->user_id,
                'store_id' => $storeId,
                'total_amount' => $totalAmount,
                'shipping_cost' => $shippingCost,
                'recipient_name' => $address->recipient_name,
                'phone_number' => $address->phone_number,
                'city' => $address->city,
                'address' => $address->address,
                'order_code' => uniqid('ORD-'),
            ]);

            // Siparişe ait sipariş öğelerini ekle
            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }
        }

        Cart::where('user_id', Auth::user()->id)
            ->where('is_active', 1)
            ->delete();

        return redirect()->intended(route('dashboard'))->with([
            'message' => 'Siparişiniz başarılı',
            'type' => 'success',
        ]);
    }

    protected function calculateShippingCost($cargoCompanyId)
    {
        $cargoCompany = CargoCompany::find($cargoCompanyId);
        return $cargoCompany ? $cargoCompany->price : 0;
    }
}
