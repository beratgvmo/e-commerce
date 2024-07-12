<?php

namespace App\Http\Controllers;

use App\Models\AttributeType;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Store;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $products = Product::with('images')->where('is_active', true)->get();

        return Inertia::render('Home', [
            'categories' => $categories,
            'products' => $products
        ]);
    }

    public function show($slug)
    {
        $product = Product::with('reviews', 'images')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $attributeTypes = AttributeType::where('category_id', $product->category_id)->get();
        $productAttributes = ProductAttribute::where('product_id', $product->id)->get();

        $attributes = [];

        foreach ($productAttributes as $productAttribute) {
            $attributes[] = Attribute::where('id', $productAttribute->attribute_id)->first();
        }

        $categories = Category::all();

        $category = Category::find($product->category_id);
        $categoryHierarchy = [];

        while ($category) {
            $categoryHierarchy[] = $category;
            $category = Category::find($category->parent_id);
        }

        $categoryHierarchy = array_reverse($categoryHierarchy);

        $store = Store::find($product->store_id);

        $storeName = $store->store_name;
        $storeRating = $store->store_rating;
        $storeFollowers = $store->followers_count;

        // Render the Inertia view with all necessary data
        return Inertia::render('ProductDetail', [
            'product' => $product,
            'attributes' => $attributes,
            'attributeTypes' => $attributeTypes,
            'categories' => $categories,
            'categoryHierarchy' => $categoryHierarchy,
            'storeName' => $storeName,
            'storeFollowers' => $storeFollowers,
            'storeRating' => $storeRating,
        ]);
    }


    public function categoryProducts(Request $request, $slug)
    {
        $categories = Category::all();
        $category = Category::where('slug', $slug)->firstOrFail();

        $query = Product::query()->where('category_id', $category->id);

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        $products = $query->get();

        return Inertia::render('CategoryProducts', [
            'category' => $category,
            'categories' => $categories,
            'products' => $products,
        ]);
    }
}


            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),