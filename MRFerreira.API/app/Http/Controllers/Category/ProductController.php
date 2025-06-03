<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\IndexResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(Category $category): AnonymousResourceCollection
    {
        $products = $category
            ->products()
            ->with('provider.addresses')
            ->get();

        return IndexResource::collection($products);
    }
}
