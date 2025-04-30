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
        Schema::table('providers', function (Blueprint $table) {
            $table->renameColumn('nome', 'name');
            $table->renameColumn('rua', 'street');
            $table->renameColumn('bairro', 'neighborhood');
            $table->renameColumn('numero', 'number');
            $table->renameColumn('cep', 'zipcode');
            $table->renameColumn('cidade', 'city');
            $table->renameColumn('estado', 'state');
            $table->renameColumn('complemento', 'complement');
            $table->renameColumn('telefone', 'phone');
            $table->renameColumn('celular', 'cellphone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->renameColumn('name', 'nome');
            $table->renameColumn('street', 'rua');
            $table->renameColumn('neighborhood', 'bairro');
            $table->renameColumn('number', 'numero');
            $table->renameColumn('zipcode', 'cep');
            $table->renameColumn('city', 'cidade');
            $table->renameColumn('state', 'estado');
            $table->renameColumn('complement', 'complemento');
            $table->renameColumn('phone', 'telefone');
            $table->renameColumn('cellphone', 'celular');
        });
    }
};
