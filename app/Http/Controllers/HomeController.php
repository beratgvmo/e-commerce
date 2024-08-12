<?php

namespace App\Http\Controllers;

use App\Models\AttributeType;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Store;
use App\Models\Attribute;
use App\Models\Cart;
use App\Models\ProductReview;
use App\Models\StoreFollower;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        $bestSellingProducts = Product::with('images')->where('is_active', true)->orderBy('sales_count', 'desc')->get();

        $stores = Store::whereNotNull('logo')
            ->orderBy('store_rating', 'desc')
            ->orderBy('reviews_count', 'desc')
            ->orderBy('product_count', 'desc')
            ->take(10)
            ->get();

        $cartCount
            = Auth::user("user") ? Cart::where("user_id", Auth::user()->id)->count() : null;

        return Inertia::render('Home', [
            'categories' => $categories,
            'bestSellingProducts' => $bestSellingProducts,
            'stores' => $stores,
            'cart' => $cartCount,
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

        $expiresAt = now()->addMinutes(3);

        views($product)
            ->cooldown($expiresAt)
            ->record();

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

        $cartCount
            = Auth::user("user") ? Cart::where("user_id", Auth::user()->id)->count() : null;

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'attributes' => $attributes,
            'attributeTypes' => $attributeTypes,
            'categories' => $categories,
            'categoryHierarchy' => $categoryHierarchy,
            'store' => $store,
            'ratingPercentages' => $ratingPercentages,
            'ratingsCount' => $ratings,
            'totalReviews' => $totalReviews,
            'products' => $products,
            'cart' => $cartCount,
        ]);
    }


    public function getAllSubCategories($parent_id)
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

        $categorySub = [];

        foreach ($categorySubMain as $category) {
            if (count($category['children']) > 0) {
                foreach ($category['children'] as $child) {
                    $categorySub[] = $child;
                }
            } else {
                $categorySub[] = $category;
            }
        }

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

            foreach ($categorySub as $category) {
                $products = $products->merge(
                    Product::with(['images'])
                        ->where('is_active', true)
                        ->where('category_id', $category->id)
                        ->get()
                );
            }
        }

        // Kategori hiyerarşisi
        $categoryHierarchy = [];
        $currentCategory = $categoryMain;
        while ($currentCategory) {
            $categoryHierarchy[] = $currentCategory;
            $currentCategory = Category::find($currentCategory->parent_id);
        }
        $categoryHierarchy = array_reverse($categoryHierarchy);

        $cartCount
            = Auth::user("user") ? Cart::where("user_id", Auth::user()->id)->count() : null;

        return Inertia::render('CategoryProducts', [
            'categories' => $categories,
            'products' => $products,
            'categoryHierarchy' => $categoryHierarchy,
            'attributesMain' => $attributesMain,
            'categorySubMain' => $categorySubMain,
            'categoryMain' => $categoryMain,
            'cart' => $cartCount,
        ]);
    }

    function formatFollowersCount($value)
    {
        if ($value >= 1000000) {
            $suffix = 'M';
            $formattedValue = number_format($value / 1000000, 1);
            if ($value % 1000000 === 0) {
                $formattedValue = floor($value / 1000000);
            }
            return $formattedValue . $suffix;
        } elseif ($value >= 1000) {
            $suffix = 'k';
            $formattedValue = number_format($value / 1000, 1);
            if ($value % 1000 === 0) {
                $formattedValue = floor($value / 1000);
            }
            return $formattedValue . $suffix;
        }
        return (string)$value;
    }

    public function shop(Request $request, $slug)
    {
        $categories = Category::all();

        $store = Store::where('slug', $slug)->with("subBanners")->firstOrFail();

        $products = Product::where('store_id', $store->id)->with('images', 'reviews')->get();

        $cartCount
            = Auth::user("user") ? Cart::where("user_id", Auth::user()->id)->count() : null;

        $isFollower = Auth::user("user")
            ? StoreFollower::where("user_id", Auth::user("user")->id)->where("store_id", $store->id)->exists()
            : false;

        $totalFollowers = $store->getTotalFollowers();
        $formattedFollowers = $this->formatFollowersCount($totalFollowers);

        $categoryMain = Category::where('id', $store->selling_category_id)->firstOrFail();

        $categorySubMain = $this->getAllSubCategories($categoryMain->id);

        $categorySub = [];

        foreach ($categorySubMain as $category) {
            if (count($category['children']) > 0) {
                foreach ($category['children'] as $child) {
                    $categorySub[] = $child;
                }
            } else {
                $categorySub[] = $category;
            }
        }

        foreach ($categorySub as $sub) {
            $attributes = AttributeType::where('category_id', $sub->id)->with('attributes')->get();

            if ($attributes->isNotEmpty()) {
                $attributesMain = $attributes;
            }
        }

        $query = Product::with(['images', 'attributes'])
            ->where('is_active', true)
            ->where('category_id', $categoryMain->id);


        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        if ($request->has('category')) {
            $query->where('category_id', $request->input('category'));
        }


        if ($request->has('attributes')) {
            $attributeFilters = $request->input('attributes');
            $query->whereHas('attributes', function ($q) use ($attributeFilters) {
                $q->whereIn('attribute_id', $attributeFilters);
            });
        }

        $productsFilter = $query->get();

        if ($productsFilter->isEmpty() && $categorySubMain->isNotEmpty()) {

            foreach ($categorySub as $category) {
                $productsFilter = $productsFilter->merge(
                    Product::with(['images'])
                        ->where('is_active', true)
                        ->where('category_id', $category->id)
                        ->get()
                );
            }
        }

        return Inertia::render('ShopHome', [
            'categories' => $categories,
            'store' => $store,
            'products' => $products,
            'productCount' => $products->count(),
            'cart' => $cartCount,
            'isFollower' => $isFollower,
            'totalFollowers' => $formattedFollowers,
            'productsFilter' => $productsFilter,
            'attributesMain' => $attributesMain,
            'categorySubMain' => $categorySubMain,
            'categoryMain' => $categoryMain,
            'categorySub' => $categorySub,
        ]);
    }
}
