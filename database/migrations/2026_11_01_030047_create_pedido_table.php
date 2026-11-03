<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedido', function (Blueprint $table) {
            $table->unsignedInteger('id')->primary();
            $table->float('cantidad', 10, 2);
            $table->date('fecha');

            $table->unsignedInteger('id_cliente');
            $table->unsignedInteger('id_comercial');

            $table->foreign('id_cliente')
                ->references('id')
                ->on('cliente');

            $table->foreign('id_comercial')
                ->references('id')
                ->on('comercial');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedido');
    }
};
