<?php

namespace App\Http\Resources\Provider;

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
            'nome' => $this->nome,
            'cnpj' => $this->cnpj,
            'rua' => $this->rua,
            'bairro' => $this->bairro,
            'numero' => $this->numero,
            'cep' => $this->cep,
            'estado' => $this->estado,
            'cidade' => $this->cidade,
            'complemento' => $this->complemento,
            'email' => $this->email,
            'telefone' => $this->telefone,
            'celular' => $this->celular,
            'logo' => $this->logo,
            'logo_url' => $this->logo_url,
        ];
    }
}
