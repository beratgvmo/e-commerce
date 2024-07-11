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
        $categories = Category::all();
        $products = Product::with('images')->get();

        return Inertia::render('Home', [
            'categories' => $categories,
            'products' => $products
        ]);
    }

    public function show($slug)
    {
        $product = Product::with('reviews', 'images')->where('slug', $slug)->firstOrFail();
        $categories = Category::all();
        $category = Category::find($product->category_id);

        // Kategori hiyerarşisini bir diziye almak
        $categoryHierarchy = [];
        while ($category) {
            $categoryHierarchy[] = $category;
            $category = Category::find($category->parent_id);
        }

        $categoryHierarchy = array_reverse($categoryHierarchy);

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'categories' => $categories,
            'categoryHierarchy' => $categoryHierarchy,
        ]);
    }

    public function categoryPage($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();


        return Inertia::render('ProductDetail', [
            'product' => $category,

        ]);
    }
}


            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),