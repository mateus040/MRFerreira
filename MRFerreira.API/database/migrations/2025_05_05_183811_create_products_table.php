<?php

use Illuminate\Database\{
    Migrations\Migration,
    Schema\Blueprint,
};
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
            $table
                ->foreignId('id_category')
                ->constrained('categories');
            $table
                ->foreignId('id_provider')
                ->constrained('providers');
            $table->string('name', 256);
            $table->text('description');
            $table
                ->string('length', 256)
                ->nullable();
            $table
                ->string('height', 256)
                ->nullable();
            $table
                ->string('depth', 256)
                ->nullable();
            $table
                ->string('weight', 256)
                ->nullable();
            $table
                ->string('line', 256)
                ->nullable();
            $table
                ->text('materials')
                ->nullable();
            $table->text('photo');
            $table->timestamps();
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
