<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginStoreController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [HomeController::class, "index"])->name("home.index");

Route::get('kategori/{slug}', [HomeController::class, 'categoryProducts'])->name('home.category');

Route::get('/urun/{slug}', [HomeController::class, "show"])->name("home.show");

Route::get('/magaza/{slug}', [HomeController::class, "shop"])->name("home.magaza");


Route::get('/profileimg', function () {
    return Inertia::render('Profile');
})->name('profile.img');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth:store')->group(function () {
    Route::get('/store/dashboard', [StoreDashboardController::class, "index"])->name("store.dashboard");

    Route::get('/store/productadd', [ProductController::class, "indexAdd"])->name('store.productAdd');

    Route::post('/store/productadd', [ProductController::class, "productAdd"]);

    Route::post('/store/logout', [LoginStoreController::class, 'destroy'])
        ->name('store.logout');

    Route::post('/store/logo-img', [StoreDashboardController::class, 'storeLogo'])->name('store.storeLogo');
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
