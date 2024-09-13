<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Services\FirebaseStorageService;

class Providers extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome', 'cnpj', 'rua', 'bairro',
        'numero', 'cep', 'cidade', 'estado', 'complemento',
        'email', 'telefone', 'celular', 'logo'
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

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute()
    {
        $firebaseStorage = app(FirebaseStorageService::class);
        return $firebaseStorage->getFileUrl($this->logo);
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
    ];
}
