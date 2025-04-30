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
            $table->dropColumn('street');
            $table->dropColumn('neighborhood');
            $table->dropColumn('number');
            $table->dropColumn('zipcode');
            $table->dropColumn('city');
            $table->dropColumn('state');
            $table->dropColumn('complement');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->string('street');
            $table->string('neighborhood');
            $table->integer('number');
            $table->string('zipcode');
            $table->string('city');
            $table->string('state');
            $table
                ->string('complement')
                ->nullable();
        });
    }
};
