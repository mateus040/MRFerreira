<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\IndexResource;
use App\Models\Provider;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * @OA\Tag(
 *     name="Provider - Products",
 * )
 */
class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/provider/{id}/products",
     *     tags={"Provider - Products"},
     *     summary="Listar produtos de uma fornecedor",
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
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="name", type="string"),
     *                     @OA\Property(property="description", type="string"),
     *                     @OA\Property(property="length", type="string"),
     *                     @OA\Property(property="height", type="string"),
     *                     @OA\Property(property="depth", type="string"),
     *                     @OA\Property(property="weight", type="string"),
     *                     @OA\Property(property="line", type="string"),
     *                     @OA\Property(property="materials", type="string"),
     *                     @OA\Property(property="photo", type="string"),
     *                     @OA\Property(property="id_provider", type="integer"),
     *                     @OA\Property(property="id_category", type="integer"),
     *                     @OA\Property(
     *                         property="provider",
     *                         type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="name", type="string"),
     *                         @OA\Property(property="cnpj", type="string"),
     *                         @OA\Property(property="email", type="string"),
     *                         @OA\Property(property="phone", type="string"),
     *                         @OA\Property(property="cellphone", type="string"),
     *                         @OA\Property(property="logo", type="string"),
     *                         @OA\Property(property="logo_url", type="string"),
     *                         @OA\Property(
     *                             property="address",
     *                             type="object",
     *                             @OA\Property(property="zipcode", type="string"),
     *                             @OA\Property(property="street", type="string"),
     *                             @OA\Property(property="neighborhood", type="string"),
     *                             @OA\Property(property="number", type="string"),
     *                             @OA\Property(property="state", type="string"),
     *                             @OA\Property(property="city", type="string"),
     *                             @OA\Property(property="complement", type="string")
     *                         ),
     *                         @OA\Property(property="created_at", type="string", format="date-time", example="2024-07-25T15:30:00")
     *                     ),
     *                     @OA\Property(
     *                         property="category",
     *                         type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="name", type="string"),
     *                         @OA\Property(property="created_at", type="string", format="date-time", example="2024-07-25T15:30:00")
     *                     ),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2024-07-25T15:30:00")
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function index(Provider $provider): AnonymousResourceCollection
    {
        $products = $provider
            ->products()
            ->with('category')
            ->get();

        return IndexResource::collection($products);
    }
}
