<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Relations\MorphMany,
    Model,
};
use Illuminate\Support\Str;
use App\Services\FirebaseStorageService;

class Provider extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cnpj',
        'street',
        'neighborhood',
        'number',
        'zipcode',
        'city',
        'state',
        'complement',
        'email',
        'phone',
        'cellphone',
        'logo',
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

    public function addresses(): MorphMany
    {
        return $this->morphMany(Address::class, 'addressable');
    }
}
