<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
};
use Illuminate\Support\Str;
use App\Services\FirebaseStorageService;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_provider',
        'id_category',
        'nome',
        'descricao',
        'comprimento',
        'altura',
        'profundidade',
        'linha',
        'materiais',
        'peso',
        'foto',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    // Gerando UUID
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Str::uuid()->toString();
            }
        });
    }

    protected $appends = ['foto_url'];

    public function getFotoUrlAttribute()
    {
        $firebaseStorage = app(FirebaseStorageService::class);
        return $firebaseStorage->getFileUrl($this->foto);
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
