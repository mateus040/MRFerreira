<?php

namespace App\Http\Resources\Provider;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'cnpj' => $this->cnpj,
            'street' => $this->street,
            'neighborhood' => $this->neighborhood,
            'number' => $this->number,
            'zipcode' => $this->zipcode,
            'state' => $this->state,
            'city' => $this->city,
            'complement' => $this->complement,
            'email' => $this->email,
            'phone' => $this->phone,
            'cellphone' => $this->cellphone,
            'logo' => $this->logo,
            'logo_url' => $this->logo_url,
        ];
    }
}
