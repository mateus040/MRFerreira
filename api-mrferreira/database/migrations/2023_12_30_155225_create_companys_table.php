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
        Schema::create('companys', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false);
            $table->string('cnpj')->nullable(false);
            $table->string('road')->nullable(false);
            $table->string('neighborhood')->nullable(false);
            $table->integer('number')->nullable(false);
            $table->string('cep')->nullable(false);
            $table->string('city')->nullable(false);
            $table->string('state')->nullable(false);
            $table->string('complement')->nullable();
            $table->string('email')->nullable(false);
            $table->string('phone')->nullable();
            $table->string('cellphone')->nullable();
            $table->string('logo')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companys');
    }
};
