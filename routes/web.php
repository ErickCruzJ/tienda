<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ComercialController;
use App\Http\Controllers\PedidoController;


Route::redirect('/', '/clientes')->name('home');
Route::resource('clientes', ClienteController::class);
Route::resource('comerciales', ComercialController::class);
Route::resource('pedidos', PedidoController::class);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});



require __DIR__.'/settings.php';
