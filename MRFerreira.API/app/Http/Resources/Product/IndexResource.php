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
            'name' => $this->name,
            'description' => $this->description,
            'length' => $this->length,
            'height' => $this->height,
            'depth' => $this->depth,
            'weight' => $this->weight,
            'line' => $this->line,
            'materials' => $this->materials,
            'photo' => $this->photo,
            'id_provider' => $this->id_provider,
            'id_category' => $this->id_category,
            'provider' => $this->whenNotNull(app(ProviderResource::class, ['resource' => $this->provider])),
            'category' => $this->whenNotNull(app(CategoryResource::class, ['resource' => $this->category])),
        ];
    }
}
