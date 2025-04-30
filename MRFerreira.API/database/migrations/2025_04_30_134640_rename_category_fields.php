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
        Schema::table('categories', function (Blueprint $table) {
            $table->renameColumn('nome', 'name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->renameColumn('name', 'nome');
        });
    }
};
