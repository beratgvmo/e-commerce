<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginStoreController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [HomeController::class, "index"])->name("home.index");

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
    Route::get('/store/dashboard', [StoreDashboardController::class, "store"])->name("store.dashboard");

    Route::post('/store/logout', [LoginStoreController::class, 'destroy'])
        ->name('store.logout');
});



require __DIR__ . '/auth.php';

// Route::get('/', function () {
//     return Inertia::render('Home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//     ]);
// });

// 'laravelVersion' => Application::VERSION,
// 'phpVersion' => PHP_VERSION,