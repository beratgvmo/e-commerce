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
            'store' => $store,
            'ratingPercentages' => $ratingPercentages,
            'ratingsCount' => $ratings,
            'totalReviews' => $totalReviews,
            'products' => $products
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

        return Inertia::render('CategoryProducts', [
            'categories' => $categories,
            'products' => $products,
            'categoryHierarchy' => $categoryHierarchy,
            'attributesMain' => $attributesMain,
            'categorySubMain' => $categorySubMain,
            'categoryMain' => $categoryMain
        ]);
    }

    public function magaza($slug)
    {
        $categories = Category::all();

        $store = Store::where('slug', $slug)->firstOrFail();

        $products = Product::where('store_id', $store->id)->with('images', 'reviews')->get();

        //   "id": 11,
        //   "name_surname": "hasan yılmaz",
        //   "store_name": "hasan yılmaz",
        //   "email": "berat@gmail.com",
        //   "email_verified_at": null,
        //   "phone_number": "0511 111 11 11",
        //   "city": "Bolu",
        //   "img": "/storage/images/zEeh6DxIjs8xKDIYR3B8HK6E40I5JSKZTNHQiCmL.webp",
        //   "slug": "hasan-yilmaz",
        //   "color": "#ca1c1c",
        //   "selling_category_id": 2,
        //   "store_rating": 1.4,
        //   "product_count": 0,
        //   "followers_count": 0,
        //   "reviews_count": 0,
        //   "created_at": "2024-07-05T18:08:43.000000Z",
        //   "updated_at": "2024-07-05T18:08:43.000000Z"

        return Inertia::render('ShopHome', [
            'categories' => $categories,
            'store' => $store,
            'products' => $products,
        ]);
    }
}


// 'canLogin' => Route::has('login'),
// 'canRegister' => Route::has('register'),