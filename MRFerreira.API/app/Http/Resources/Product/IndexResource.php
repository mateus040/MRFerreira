<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\{
    Category\IndexResource as CategoryResource,
    Provider\IndexResource as ProviderResource,
};
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
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'comprimento' => $this->comprimento,
            'altura' => $this->altura,
            'profundidade' => $this->profundidade,
            'peso' => $this->peso,
            'linha' => $this->linha,
            'materiais' => $this->materiais,
            'foto' => $this->foto,
            'id_provider' => $this->id_provider,
            'id_category' => $this->id_category,
            'provider' => $this->whenNotNull(app(ProviderResource::class, ['resource' => $this->provider])),
            'category' => $this->whenNotNull(app(CategoryResource::class, ['resource' => $this->category])),
        ];
    }
}
