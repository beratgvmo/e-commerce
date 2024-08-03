<?php

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

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'dashboard'])->name("dashboard");
    Route::get('/sepet', [UserDashboardController::class, 'cart'])->name("user.cart");
    Route::get('/odeme-yap', [UserDashboardController::class, 'payment'])->name("user.payment");

    Route::post('/sepet/add', [UserDashboardController::class, 'addToCart'])->name("user.cartAdd");
    Route::post('/sepet/reduce', [UserDashboardController::class, 'reduceFromCart'])->name("user.reduceToCart");
    Route::post('/sepet/remove', [UserDashboardController::class, 'removeFromCart'])->name("user.removeFromCart");

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




Route::middleware('auth:store')->group(function () {
    Route::get('/store/dashboard', [StoreDashboardController::class, "index"])->name("store.dashboard");

    Route::get('/store/productlist', [ProductController::class, "indexList"])->name('store.productList');
    Route::get('/store/productadd', [ProductController::class, "indexAdd"])->name('store.productAdd');
    Route::post('/store/productadd', [ProductController::class, "productAdd"]);

    Route::get('/store/order', [OrderController::class, "orderList"])->name('store.order');
    Route::get('/store/order/{order_code}', [OrderController::class, "orderDetail"])->name('store.orderDetail');
    Route::get('/store/order/{id}/pdf', [OrderController::class, 'generatePdf'])->name('orders.pdf');

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
