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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->morphs('addressable');
            $table
                ->string('zipcode', 8)
                ->nullable();
            $table->string('street', 256);
            $table->string('number', 4);
            $table->string('neighborhood', 256);
            $table->string('state', 32);
            $table->string('city', 64);
            $table
                ->string('complement', 256)
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
