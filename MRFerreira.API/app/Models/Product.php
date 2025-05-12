<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
};
use App\Services\FirebaseStorageService;

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

    public function getFotoUrlAttribute()
    {
        $firebaseStorage = app(FirebaseStorageService::class);
        return $firebaseStorage->getFileUrl($this->photo);
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class, 'id_provider');
    }


    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
}
