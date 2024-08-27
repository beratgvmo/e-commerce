<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\AttributeType;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductImg;
use Attribute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function indexList()
    {
        $products = Product::where("store_id", Auth::user()->id)->with('category', 'images', "attributes")->paginate(12);

        $productsCount = Product::where("store_id", Auth::user()->id)->count();

        return Inertia::render('Store/ProductList', ['products' => $products, 'productsCount' => $productsCount]);
    }

    public function indexAdd()
    {
        $categories = Category::where('parent_id', Auth::user()->selling_category_id)->get();
        $subCategories = [];
        $attributeTypes = [];

        foreach ($categories as $category) {
            $subCategories = array_merge($subCategories, Category::where('parent_id', $category->id)->get()->toArray());
        }

        foreach ($subCategories as $subCategory) {
            $attributeTypes[$subCategory['id']] = AttributeType::where('category_id', $subCategory['id'])
                ->with('attributes')
                ->get();
        }

        return Inertia::render('Store/ProductAdd', [
            'categories' => $categories,
            'subCategories' => $subCategories,
            'attributeTypes' => $attributeTypes
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

        if ($request->product_attributes) {
            foreach ($request->product_attributes as $attribute) {
                $attributeId = $attribute['attribute_id'];
                ProductAttribute::create([
                    'product_id' => $product->id,
                    'attribute_id' => $attributeId,
                ]);
            }
        }

        return redirect()->route('store.productList')->with('success', 'Product added successfully');
    }

    public function productUpdatePage(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $productImg = ProductImg::where("product_id", $id)->get();
        $productAttribute = ProductAttribute::where("product_id", $id)->get();

        $attributeTypes = AttributeType::where('category_id', $product->category_id)
            ->with('attributes')
            ->get();

        return Inertia::render('Store/ProductUpdate', [
            'product' => $product,
            'productImg' => $productImg,
            'productAttribute' => $productAttribute,
            'attributeTypes' => $attributeTypes
        ]);
    }

    public function productUpdateNumbers(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'price' => 'required',
            'discounted_price' => 'required',
            'stock_quantity' => 'required',
        ]);

        $price = $this->formatPrice($request->price);
        $discountedPrice = $this->formatPrice($request->discounted_price);
        $stockQuantity = $this->formatStockQuantity($request->stock_quantity);

        if ($discountedPrice > $price) {
            $discountedPrice = $price;
        }

        if ($price != $product->price) {
            $discountedPrice = $price;
        }

        if ($price < 10) {
            return redirect()->back()->with([
                'message' => 'Ürün fiyatı en az 10 TL olmalıdır.',
                'type' => 'error',
            ]);
        }

        if ($discountedPrice < 10) {

            return redirect()->back()->with([
                'message' => 'İndirimli ürün fiyatı en az 10 TL olmalıdır.',
                'type' => 'error',
            ]);
        }

        if ($price > 999999.99 || $discountedPrice > 999999.99) {
            return redirect()->back()->with([
                'message' => 'Ürün fiyatı en fazla 999.999,99 TL olabilir.',
                'type' => 'error',
            ]);
        }

        if ($stockQuantity < 0) {
            return redirect()->back()->with([
                'message' => 'Stok miktarı 0\'dan az olamaz.',
                'type' => 'error',
            ]);
        }

        $product->update([
            'price' => $price,
            'discounted_price' => $discountedPrice,
            'stock_quantity' => $stockQuantity,
        ]);

        return redirect()->back()->with([
            'message' => 'Ürün bilgileri başarıyla güncellendi.',
            'type' => 'success',
        ]);
    }


    public function updateImgOrder(Request $request)
    {
        // return $request;
        foreach ($request->images as $images) {
            ProductImg::where('id', $images["id"])->update(['order' => $images["order"]]);
        }

        return redirect()->back()->with([
            'message' => 'Ürün Resimi Güncelledi.',
            'type' => 'success',
        ]);
    }

    public function productImgAdd(Request $request, $id)
    {
        return $request;
        $images = $request->file('images');

        $imagePath = $images->store('public/images');
        $imageUrl = Storage::url($imagePath);

        ProductImg::create([
            'product_id' => $request->product->id,
            'img' => $imageUrl,
        ]);

        return redirect()->back()->with([
            'message' => 'Ürüne yeni Resmi eklendi',
            'type' => 'success',
        ]);
    }

    public function productImgDestroy($id)
    {
        $img = ProductImg::find($id);

        if (!$img) {
            return redirect()->back()->with([
                'message' => 'Ürün resmi bulunamadı.',
                'type' => 'error',
            ]);
        }

        Storage::disk('public')->delete($img->img);
        $img->delete();

        return redirect()->back()->with([
            'message' => 'Ürün resmi silindi.',
            'type' => 'success',
        ]);
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
