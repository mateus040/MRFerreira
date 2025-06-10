<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
};
use App\Services\FirebaseStorageService;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_provider',
        'id_category',
        'name',
        'description',
        'length',
        'height',
        'depth',
        'weight',
        'line',
        'materials',
        'photo',
    ];

    protected $appends = ['foto_url'];

    public function getFotoUrlAttribute(): string
    {
        $firebaseStorage = app(FirebaseStorageService::class);
        return $firebaseStorage->getFileUrl($this->photo);
    }

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class, 'id_provider');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
}
