<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\IndexResource;
use App\Models\Provider;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(Provider $provider): AnonymousResourceCollection
    {
        $products = $provider
            ->products()
            ->with('category')
            ->get();

        return IndexResource::collection($products);
    }
}
