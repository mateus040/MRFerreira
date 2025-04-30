<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Relations\MorphTo,
    Model,
};

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'zipcode',
        'street',
        'number',
        'neighborhood',
        'state',
        'city',
        'complement',
    ];

    public function addressable(): MorphTo
    {
        return $this->morphTo();
    }
}
