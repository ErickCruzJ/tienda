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
        Schema::create('comercial', function (Blueprint $table) {
            $table->unsignedInteger('id')->primary();
            $table->string('nombre', 100);
            $table->string('apellido1', 100);
            $table->string('apellido2', 100);
            $table->string('ciudad',100)->nullable();
            $table->float('comision', 10, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comercial');
    }
};
