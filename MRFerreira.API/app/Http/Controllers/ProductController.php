<?php

namespace App\Http\Controllers;

use App\Exceptions\ResponseException;
use App\Helpers\ExceptionHelper;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Resources\Product\{
    IndexResource,
    ShowResource,
};
use App\Models\{
    Category,
    Provider,
    Product,
};
use Illuminate\Support\{
    Facades\Log,
    Str,
};
use App\Services\FirebaseStorageService;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Throwable;

/**
 * @OA\Tag(
 *     name="Products",
 * )
 */
class ProductController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    /**
     * @OA\Get(
     *     path="/api/products",
     *     tags={"Products"},
     *     summary="Listar produtos",
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
    public function index()
    {
        $products = Product::with(['provider', 'category'])->get();

        return IndexResource::collection($products);
    }

    /**
     * @OA\Post(
     *     path="/api/products",
     *     tags={"Products"},
     *     summary="Cadastrar um novo produto",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "description", "photo", "id_provider", "id_category"},
     *             @OA\Property(property="name", type="string", example="Produto 1"),
     *             @OA\Property(property="description", type="string", example="Descrição do produto"),
     *             @OA\Property(property="length", type="string", example="10"),
     *             @OA\Property(property="height", type="string", example="10"),
     *             @OA\Property(property="depth", type="string", example="10"),
     *             @OA\Property(property="weight", type="string", example="10"),
     *             @OA\Property(property="line", type="string", example="Linha do produto"),
     *             @OA\Property(property="materials", type="string", example="Materiais do produto"),
     *             @OA\Property(property="photo", type="string", format="binary"),
     *             @OA\Property(property="id_provider", type="integer", example=0),
     *             @OA\Property(property="id_category", type="integer", example=0),
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
     *                 @OA\Property(property="id", type="integer"),
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
    public function store(StoreRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $imageName = Str::random(32) . "." . $validated['photo']->getClientOriginalExtension();

            $this
                ->firebaseStorage
                ->uploadFile($validated['photo'], $imageName);

            $product = Product::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'length' => $validated['length'] ?? "",
                'height' => $validated['height'] ?? "",
                'depth' => $validated['depth'] ?? "",
                'weight' => $validated['weight'] ?? "",
                'line' => $validated['line'] ?? "",
                'materials' => $validated['materials'] ?? "",
                'photo' => $imageName,
                'id_provider' => $validated['id_provider'],
                'id_category' => $validated['id_category'],
            ]);

            DB::commit();

            return response()->json([
                'data' => [
                    'id' => $product->id,
                ],
            ], HttpResponse::HTTP_CREATED);
        } catch (Throwable $th) {
            DB::rollBack();

            throw app(
                ResponseException::class,
                ['message' => ExceptionHelper::getExceptionMessage($th)],
            );
        }
    }

    /**
     * @OA\Get(
     *     path="/api/products/{product}",
     *     tags={"Products"},
     *     summary="Visualizar os dados de um produto",
     *     @OA\Parameter(
     *         name="product",
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
    public function show(Product $product)
    {
        return app(ShowResource::class, ['resource' => $product]);
    }

    /**
     * @OA\Put(
     *     path="/api/products/{product}",
     *     tags={"Products"},
     *     summary="Atualizar um produto",
     *     @OA\Parameter(
     *         name="product",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "description", "photo", "id_provider", "id_category"},
     *             @OA\Property(property="name", type="string", example="Produto 1"),
     *             @OA\Property(property="description", type="string", example="Descrição do produto"),
     *             @OA\Property(property="length", type="string", example="10"),
     *             @OA\Property(property="height", type="string", example="10"),
     *             @OA\Property(property="depth", type="string", example="10"),
     *             @OA\Property(property="weight", type="string", example="10"),
     *             @OA\Property(property="line", type="string", example="Linha do produto"),
     *             @OA\Property(property="materials", type="string", example="Materiais do produto"),
     *             @OA\Property(property="photo", type="string", format="binary"),
     *             @OA\Property(property="id_provider", type="integer", example=0),
     *             @OA\Property(property="id_category", type="integer", example=0),
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
    public function update(StoreRequest $request, Product $product)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $product->update([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'length' => $validated['length'] ?? "",
                'height' => $validated['height'] ?? "",
                'depth' => $validated['depth'] ?? "",
                'weight' => $validated['weight'] ?? "",
                'line' => $validated['line'] ?? "",
                'materials' => $validated['materials'] ?? "",
                'id_provider' => $validated['id_provider'],
                'id_category' => $validated['id_category'],
            ]);

            if ($request->hasFile('photo')) {
                $this
                    ->firebaseStorage
                    ->deleteFile($product->photo);

                $imageName = Str::random(32) . "." . $validated['photo']->getClientOriginalExtension();

                $this
                    ->firebaseStorage
                    ->uploadFile($validated['photo'], $imageName);

                $product->update(['photo' => $imageName]);
            }

            DB::commit();

            return response()->noContent();
        } catch (Throwable $th) {
            DB::rollBack();

            throw app(
                ResponseException::class,
                ['message' => ExceptionHelper::getExceptionMessage($th)],
            );
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/products/{product}",
     *     tags={"Products"},
     *     summary="Deletar um produto",
     *     @OA\Parameter(
     *         name="product",
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
    public function destroy(Product $product)
    {
        $this
            ->firebaseStorage
            ->deleteFile($product->photo);

        $product->delete();

        return response()->noContent();
    }

    public function getCards()
    {
        try {
            $products_count = Product::count();
            $providers_count = Provider::count();
            $categories_count = Category::count();

            return response()->json([
                'results' => [
                    'products_count' => $products_count,
                    'providers_count' => $providers_count,
                    'categories_count' => $categories_count
                ]
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao retornar informações: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornos informações: ' . $e->getMessage()], 500);
        }
    }
}
