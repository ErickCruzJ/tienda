<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;


Route::inertia('/', 'welcome')->name('home');
Route::resource('clientes', ClienteController::class);



Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});



require __DIR__.'/settings.php';
