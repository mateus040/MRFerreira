<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Resources\Category\{
    IndexResource,
    ShowResource,
};
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\{
    AnonymousResourceCollection,
    JsonResource,
};
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

/**
 * @OA\Tag(
 *     name="Categories",
 * )
 */
class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categories",
     *     tags={"Categories"},
     *     summary="Listar categorias",
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
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2024-07-25T15:30:00")
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function index(): AnonymousResourceCollection
    {
        $categories = Category::get();

        return IndexResource::collection($categories);
    }

    /**
     * @OA\Post(
     *     path="/api/categories",
     *     tags={"Categories"},
     *     summary="Cadastrar uma categoria",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Categoria")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Created",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string"),
     *                 )
     *             )
     *         }
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Unprocessable Content",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string"),
     *                     @OA\Property(
     *                         property="errors",
     *                         type="object",
     *                         @OA\Property(
     *                             property="field",
     *                             type="array",
     *                             items=@OA\Items(type="string")
     *                         )
     *                     )
     *                 )
     *             )
     *         }
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $category = Category::create([
            'name' => $validated['name'],
        ]);

        return response()->json([
            'data' => [
                'id' => $category->id,
            ],
        ], HttpResponse::HTTP_CREATED);
    }

    /**
     * @OA\Get(
     *     path="/api/categories/{category}",
     *     tags={"Categories"},
     *     summary="Visualizar os dados de uma categoria",
     *     @OA\Parameter(
     *         name="category",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2024-07-25T15:30:00")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string")
     *                 )
     *             )
     *         }
     *     )
     * )
     */
    public function show(Category $category): JsonResource
    {
        return app(ShowResource::class, ['resource' => $category]);
    }

    /**
     * @OA\Put(
     *     path="/api/categories/{category}",
     *     tags={"Categories"},
     *     summary="Atualizar uma categoria",
     *     @OA\Parameter(
     *         name="category",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Categoria")
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="No Content",
     *         @OA\JsonContent(type="object", additionalProperties=false)
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string"),
     *                 )
     *             )
     *         }
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string")
     *                 )
     *             )
     *         }
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Unprocessable Content",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string"),
     *                     @OA\Property(
     *                         property="errors",
     *                         type="object",
     *                         @OA\Property(
     *                             property="field",
     *                             type="array",
     *                             items=@OA\Items(type="string")
     *                         )
     *                     )
     *                 )
     *             )
     *         }
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function update(StoreRequest $request, Category $category): Response
    {
        $category->update([
            'name' => $request->name,
        ]);

        return response()->noContent();
    }

    /**
     * @OA\Delete(
     *     path="/api/categories/{category}",
     *     tags={"Categories"},
     *     summary="Deletar uma categoria",
     *     @OA\Parameter(
     *         name="category",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="No Content",
     *         @OA\JsonContent(type="object", additionalProperties=false)
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string"),
     *                 )
     *             )
     *         }
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         content={
     *             @OA\MediaType(
     *                 mediaType="application/json",
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string")
     *                 )
     *             )
     *         }
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function destroy(Category $category): Response
    {
        $category->delete();

        return response()->noContent();
    }
}
