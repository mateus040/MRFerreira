<?php

namespace App\Http\Controllers;

use App\Models\{
    Category,
    Product,
    Provider,
};
use Symfony\Component\HttpFoundation\Response as HttpResponse;

/**
 * @OA\Tag(
 *     name="Cards",
 * )
 */
class CardController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/cards",
     *     tags={"Cards"},
     *     summary="Listar quantidade de produtos, fornecedores e categorias",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="products_count", type="integer"),
     *                     @OA\Property(property="providers_count", type="integer"),
     *                     @OA\Property(property="categories_count", type="integer"),
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *        response=401,
     *        description="Unauthorized",
     *        content={
     *            @OA\MediaType(
     *                mediaType="application/json",
     *                @OA\Schema(
     *                    type="object",
     *                    @OA\Property(property="message", type="string"),
     *                )
     *            )
     *        }
     *     ),
     * )
     */
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
