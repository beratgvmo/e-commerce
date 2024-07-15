<?php

namespace App\Http\Controllers;

use App\Models\AttributeType;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Store;
use App\Models\Attribute;
use App\Models\ProductReview;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Return_;

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
        $product = Product::with(['reviews' => function ($query) {
            $query->take(10);
        }, 'images'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $products = Product::where("category_id", $product->category_id)->with("images")->get();

        // Ürün özellikleri
        $attributeTypes = AttributeType::where('category_id', $product->category_id)->get();
        $productAttributes = ProductAttribute::where('product_id', $product->id)->get();

        $attributes = [];
        foreach ($productAttributes as $productAttribute) {
            $attributes[] = Attribute::where('id', $productAttribute->attribute_id)->first();
        }

        // Kategori hiyerarşisi
        $categories = Category::all();
        $category = Category::find($product->category_id);
        $categoryHierarchy = [];

        while ($category) {
            $categoryHierarchy[] = $category;
            $category = Category::find($category->parent_id);
        }
        $categoryHierarchy = array_reverse($categoryHierarchy);

        // Mağaza bilgileri
        $store = Store::find($product->store_id);
        $storeName = $store->store_name;
        $storeRating = $store->store_rating;
        $storeFollowers = $store->followers_count;

        // Yorum ve yüzdelik oranları hesapla
        $reviews = ProductReview::where('product_id', $product->id)->get();
        $ratings = [1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0];

        foreach ($reviews as $review) {
            $ratings[$review->rating]++;
        }

        $totalReviews = $reviews->count();

        foreach ($ratings as $rating => $count) {
            $ratingPercentages[$rating] = $totalReviews > 0 ? ($count / $totalReviews) * 100 : 0;
        }

        // Yorum kullanıcı ismini ve tarihi
        foreach ($product->reviews as $comment) {
            $comment->user_name = User::where('id', $comment->user_id)->value('name');
            $comment->formatted_created_at = \Carbon\Carbon::parse($comment->created_at)->locale('tr')->isoFormat('D MMMM YYYY, dddd');
        }

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'attributes' => $attributes,
            'attributeTypes' => $attributeTypes,
            'categories' => $categories,
            'categoryHierarchy' => $categoryHierarchy,
            'storeName' => $storeName,
            'storeFollowers' => $storeFollowers,
            'storeRating' => $storeRating,
            'ratingPercentages' => $ratingPercentages,
            'ratingsCount' => $ratings,
            'totalReviews' => $totalReviews,
            'products' => $products
        ]);
    }


    public function getAllSubCategories($parent_id = null)
    {
        return Category::with('children')
            ->where('parent_id', $parent_id)
            ->get();
    }

    public function categoryProducts(Request $request, $slug)
    {
        // Kategorileri
        $categories = Category::all();
        $categoryMain = Category::where('slug', $slug)->firstOrFail();

        // Alt kategorileri

        $categorySubMain = $this->getAllSubCategories($categoryMain->id);

        foreach ($categorySubMain as $category) {
            count($category->children) > 0 ?
                $categorySub[] = $category->children : $categorySub[] =  $category;
        }


        return $categorySub;

        // Attributes ve ürün sorguları
        $attributesMain = AttributeType::where('category_id', $categoryMain->id)->with('attributes')->get();

        $query = Product::with(['images', 'attributes'])
            ->where('is_active', true)
            ->where('category_id', $categoryMain->id);


        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        if ($request->has('attributes')) {
            $attributeFilters = $request->input('attributes');
            $query->whereHas('attributes', function ($q) use ($attributeFilters) {
                $q->whereIn('attribute_id', $attributeFilters);
            });
        }

        $products = $query->get();


        if ($products->isEmpty() && $categorySubMain->isNotEmpty()) {
            $categorySub->each(function ($category) use (&$products) {
                $products = $products->merge(
                    Product::with(['images'])
                        ->where('is_active', true)
                        ->where('category_id', $category->id)
                        ->get()
                );
            });
        }

        // Kategori hiyerarşisi
        $categoryHierarchy = [];
        $currentCategory = $categoryMain;
        while ($currentCategory) {
            $categoryHierarchy[] = $currentCategory;
            $currentCategory = Category::find($currentCategory->parent_id);
        }
        $categoryHierarchy = array_reverse($categoryHierarchy);

        return Inertia::render('CategoryProducts', [
            'categories' => $categories,
            'products' => $products,
            'categoryHierarchy' => $categoryHierarchy,
            'attributesMain' => $attributesMain,
            'categorySubMain' => $categorySubMain,
            'categoryMain' => $categoryMain
        ]);
    }
}


// 'canLogin' => Route::has('login'),
// 'canRegister' => Route::has('register'),