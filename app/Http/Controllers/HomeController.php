<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImg;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Tüm kategorileri ve alt kategorileri getiriyoruz
        $categories = Category::all();
        $products = Product::all();
        $productImg = ProductImg::all();

        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'categories' => $categories,
            'products' => $products
        ]);
    }

    public function show($id)
    {
        $product = Product::with('reviews', 'images')->findOrFail($id);

        return $product;

        return Inertia::render('ProductDetail', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'product' => $product
        ]);
    }
}
