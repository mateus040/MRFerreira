<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companys extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'cnpj', 'road', 'neighborhood',
        'number', 'cep', 'city', 'state', 'complement',
        'email', 'phone', 'cellphone', 'logo'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
    ];
}
