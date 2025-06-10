<?php

namespace App\Http\Controllers;

use App\Models\{
    Category,
    Product,
    Provider,
};
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class CardController extends Controller
{
    public function index()
    {
        $products_count = Product::count();
        $providers_count = Provider::count();
        $categories_count = Category::count();

        return response()->json([
            'data' => [
                'products_count' => $products_count,
                'providers_count' => $providers_count,
                'categories_count' => $categories_count,
            ],
        ], HttpResponse::HTTP_OK);
    }
}
