<?php

namespace App\Http\Resources\Provider;

use App\Http\Resources\Address\AddressResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'cellphone' => $this->cellphone,
            'logo' => $this->logo,
            'logo_url' => $this->logo_url,
            'address' => $this->whenNotNull(app(AddressResource::class, ['resource' => $this->addresses->first()])),
            'created_at' => $this->created_at->toDateTimeLocalString(),
        ];
    }
}
