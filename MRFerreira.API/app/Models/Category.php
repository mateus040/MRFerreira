<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
};
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    // Gerando UUID
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Str::uuid()->toString();
            }
        });
    }
}
