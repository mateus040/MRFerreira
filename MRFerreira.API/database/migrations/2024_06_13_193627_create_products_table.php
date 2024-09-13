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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome')->nullable(false);
            $table->string('descricao')->nullable(false);
            $table->double('comprimento')->nullable();
            $table->double('altura')->nullable();
            $table->double('profundidade')->nullable();
            $table->double('peso')->nullable();
            $table->string('linha')->nullable();
            $table->string('materiais')->nullable();
            $table->string('foto')->nullable(false);
            $table->uuid('id_provider')->nullable(false);
            $table->timestamps();

            $table->foreign('id_provider')->references('id')->on('providers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
