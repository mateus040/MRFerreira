<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Services\FirebaseStorageService;

class Products extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'descricao', 'comprimento', 'altura', 'profundidade', 'linha', 'materiais', 'peso', 'foto', 'id_provider', 'id_category'];

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
        return $this->belongsTo(Providers::class, 'id_provider');
    }


    public function category()
    {
        return $this->belongsTo(Categories::class, 'id_category');
    }
}
