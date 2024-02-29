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
            $table->id();
            $table->string('name')->nullable(false);
            $table->string('description')->nullable(false);
            $table->double('length')->nullable(false);
            $table->double('height')->nullable(false);
            $table->double('depth')->nullable(false);
            $table->double('weight')->nullable(false);
            $table->string('photo')->nullable(false);
            $table->unsignedBigInteger('id_company')->nullable(false);
            $table->timestamps();

            $table->foreign('id_company')->references('id')->on('companys')->onDelete('cascade');
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
