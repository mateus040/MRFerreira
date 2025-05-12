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
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 128);
            $table
                ->string('cnpj', 14)
                ->unique()
                ->nullable();
            $table->string('email');
            $table
                ->string('phone', 15)
                ->nullable();
            $table
                ->string('cellphone', 15)
                ->nullable();
            $table->text('logo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('providers');
    }
};
