<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Relations\HasMany,
    Factories\HasFactory,
    Model,
};

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'id_category');
    }
}
