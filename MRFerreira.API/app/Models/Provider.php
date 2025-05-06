<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
};
use Illuminate\Database\Eloquent\Relations\{
    MorphMany,
    HasMany,
};
use App\Services\FirebaseStorageService;

class Provider extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'cnpj',
        'phone',
        'cellphone',
        'logo',
    ];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute()
    {
        $firebaseStorage = app(FirebaseStorageService::class);
        return $firebaseStorage->getFileUrl($this->logo);
    }

    public function addresses(): MorphMany
    {
        return $this->morphMany(Address::class, 'addressable');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'id_provider');
    }
}
