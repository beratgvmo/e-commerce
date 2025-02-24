<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginStoreController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreDashboardController;
use App\Http\Controllers\UserDashboardController;
use App\Models\Order;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [HomeController::class, "index"])->name("home.index");

Route::get('kategori/{slug}', [HomeController::class, 'categoryProducts'])->name('home.category');

Route::get('/urun/{slug}', [HomeController::class, "show"])->name("home.show");

Route::get('/magaza/{slug}', [HomeController::class, "shop"])->name("home.magaza");
// Route::get('/magaza/{slug}/{attribute}', [HomeController::class, "shopAttribute"])->name("home.magazaAttribute");


Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'dashboard'])->name("dashboard");
    Route::get('/odeme-yap', [UserDashboardController::class, 'payment'])->name("user.payment");

    Route::post("/user/addresses", [UserDashboardController::class, "userAddresses"])->name("user.addresses");

    Route::post("/user/product-order", [UserDashboardController::class, "userProductOrder"])->name("user.productOrder");

    Route::get('/sepet', [UserDashboardController::class, 'cart'])->name("user.cart");
    Route::post('/sepet/add', [UserDashboardController::class, 'addToCart'])->name("user.cartAdd");
    Route::post('/sepet/reduce', [UserDashboardController::class, 'reduceFromCart'])->name("user.reduceToCart");
    Route::post('/sepet/remove', [UserDashboardController::class, 'removeFromCart'])->name("user.removeFromCart");
    Route::post('/sepet/active', [UserDashboardController::class, 'activeCart'])->name('user.activeCart');

    Route::get('/siparislerim', [UserDashboardController::class, 'order'])->name("user.order");


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/user/{store}/follow', [UserDashboardController::class, 'follow'])->name('stores.follow');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});


Route::middleware('auth:store')->group(function () {
    Route::get('/store/dashboard', [StoreDashboardController::class, "index"])->name("store.dashboard");

    Route::get('/store/product-list', [ProductController::class, "indexList"])->name('store.productList');
    Route::get('/store/product-add', [ProductController::class, "indexAdd"])->name('store.productAdd');
    Route::post('/store/product-add', [ProductController::class, "productAdd"]);

    Route::delete('/store/product-list/delete/{id}', [ProductController::class, 'productDelete'])->name('store.productDelete');

    Route::post('/store/product-list/images-update', [ProductController::class, 'updateImgOrder'])->name('store.updateImgOrder');
    Route::post('/store/product-list/images-add/{id}', [ProductController::class, 'productImgAdd'])->name('store.productImgAdd');
    Route::delete('/store/product-list/images-delete/{id}', [ProductController::class, 'productImgDestroy'])->name('store.imgDestroy');

    Route::get('/store/product-list/update/{id}', [ProductController::class, "productUpdatePage"])->name('store.productUpdate');
    Route::patch('store/product-list/update/{id}', [ProductController::class, 'productUpdateNumbers'])->name('store.updateNumbers');

    Route::get('/store/order', [OrderController::class, "orderList"])->name('store.order');
    Route::get('/store/order/{order_code}', [OrderController::class, "orderDetail"])->name('store.orderDetail');
    Route::put('/store/order/update/{id}', [OrderController::class, "updateOrderDetail"])->name('update.orderDetail');
    Route::put('/store/order/all-update/{order_code}', [OrderController::class, "allUpdateOrderDetail"])->name('allUpdate.orderDetail');

    Route::get('/store/order/all-pdf/{order_code}', [OrderController::class, 'generatePdfAll']);

    Route::post('/store/logout', [LoginStoreController::class, 'destroy'])
        ->name('store.logout');

    Route::post('/store/storeLogo', [StoreDashboardController::class, 'storeLogo'])->name('store.storeLogo');
    Route::post('/store/storeBanner', [StoreDashboardController::class, 'storeBanner'])->name('store.storeBanner');
    Route::post('/store/storeSubBanner', [StoreDashboardController::class, 'storeSubBanner'])->name('store.storeSubBanner');
    Route::delete('/store/deleteSubBanner/{id}', [StoreDashboardController::class, 'deleteSubBanner'])->name('store.deleteSubBanner');
});

// Route::get('/', function () {
//     return Inertia::render('Home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//     ]);
// });

// 'laravelVersion' => Application::VERSION,
// 'phpVersion' => PHP_VERSION,

require __DIR__ . '/auth.php';
