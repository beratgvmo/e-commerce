<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function indexList()
    {
        $products = Product::with('category', 'images', "attributes")->paginate(12);

        return Inertia::render('Store/ProductList', ['products' => $products]);
    }

    public function indexAdd()
    {
        $categories = Category::where('parent_id', Auth::user()->selling_category_id)->get();
        $subCategories = [];

        foreach ($categories as $category) {
            $subCategories = array_merge($subCategories, Category::where('parent_id', $category->id)->get()->toArray());
        }

        return Inertia::render('Store/ProductAdd', [
            'categories' => $categories,
            'subCategories' => $subCategories,
        ]);
    }

    public function productAdd(ProductRequest $request)
    {
        $price = $this->formatPrice($request->price);
        $stockQuantity = $this->formatStockQuantity($request->stock_quantity);

        $baseSlug = Str::slug($request->name, '-');
        $uniqueIdentifier = strtoupper(Str::random(12));
        $slug = "{$baseSlug}-{$uniqueIdentifier}";

        $product = Product::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'price' => $price,
            'stock_quantity' => $stockQuantity,
            'is_active' => $request->is_active,
            'slug' => $slug,
            'discounted_price' => $price,
            'store_id' => Auth::id(),
        ]);

        if ($request->hasFile('images')) {
            $images = $request->file('images');

            foreach ($images as $image) {
                $imagePath = $image->store('public/images');
                $imageUrl = Storage::url($imagePath);

                ProductImg::create([
                    'product_id' => $product->id,
                    'img' => $imageUrl,
                ]);
            }
        }

        return redirect()->route('store.productAdd')->with('success', 'Product added successfully');
    }

    private function formatPrice($price)
    {
        $price = str_replace('.', '', $price);
        $price = str_replace(',', '.', $price);
        return (float)$price;
    }

    private function formatStockQuantity($quantity)
    {
        $quantity = str_replace('.', '', $quantity);
        return (int)$quantity;
    }
}



// // Görselleri kaydetme işlemi (opsiyonel)


//     public function store(Request $request)
//     {
//         $product = Product::create($request->all());
//         return response()->json($product, 201);
//     }


//     public function update(Request $request, $id)
//     {
//         $product = Product::findOrFail($id);
//         $product->update($request->all());
//         return response()->json($product);
//     }

//     public function destroy($id)
//     {
//         $product = Product::findOrFail($id);
//         $product->delete();
//         return response()->json(null, 204);
//     }

//     public function addImage(Request $request, $id)
//     {
//         $image = new ProductImg(['img' => $request->img, 'product_id' => $id]);
//         $image->save();
//         return response()->json($image, 201);
//     }

//     public function removeImage($id)
//     {
//         $image = ProductImg::findOrFail($id);
//         $image->delete();
//         return response()->json(null, 204);
//     }

//     public function addReview(Request $request, $id)
//     {
//         $review = new ProductReview(['comment' => $request->comment, 'rating' => $request->rating, 'product_id' => $id, 'user_id' => $request->user_id]);
//         $review->save();
//         return response()->json($review, 201);
//     }

//     public function updateReview(Request $request, $id)
//     {
//         $review = ProductReview::findOrFail($id);
//         $review->update($request->all());
//         return response()->json($review);
//     }

//     public function removeReview($id)
//     {
//         $review = ProductReview::findOrFail($id);
//         $review->delete();
//         return response()->json(null, 204);
//     }
// }

// // routes/api.php
// use App\Http\Controllers\ProductController;

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/products', [ProductController::class, 'index']);
//     Route::post('/products', [ProductController::class, 'store']);
//     Route::get('/products/{id}', [ProductController::class, 'show']);
//     Route::put('/products/{id}', [ProductController::class, 'update']);
//     Route::delete('/products/{id}', [ProductController::class, 'destroy']);
//     Route::post('/products/{id}/images', [ProductController::class, 'addImage']);
//     Route::delete('/products/images/{id}', [ProductController::class, 'removeImage']);
//     Route::post('/products/{id}/reviews', [ProductController::class, 'addReview']);
//     Route::put('/reviews/{id}', [ProductController::class, 'updateReview']);
//     Route::delete('/reviews/{id}', [ProductController::class, 'removeReview']);
// });
