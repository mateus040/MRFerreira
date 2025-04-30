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
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('nome', 'name');
            $table->renameColumn('descricao', 'description');
            $table->renameColumn('comprimento', 'length');
            $table->renameColumn('altura', 'height');
            $table->renameColumn('profundidade', 'depth');
            $table->renameColumn('peso', 'weight');
            $table->renameColumn('linha', 'line');
            $table->renameColumn('materiais', 'materials');
            $table->renameColumn('foto', 'photo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('name', 'nome');
            $table->renameColumn('description', 'descricao');
            $table->renameColumn('length', 'comprimento');
            $table->renameColumn('height', 'altura');
            $table->renameColumn('depth', 'profundidade');
            $table->renameColumn('weight', 'peso');
            $table->renameColumn('line', 'linha');
            $table->renameColumn('materials', 'materiais');
            $table->renameColumn('photo', 'foto');
        });
    }
};
