<?php

namespace App\Http\Controllers\Provider;

use App\Exceptions\ResponseException;
use App\Helpers\ExceptionHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Provider\StoreRequest;
use App\Http\Resources\Provider\{
    IndexResource,
    ShowResource,
};
use App\Models\Provider;
use App\Services\FirebaseStorageService;
use Illuminate\Support\{
    Facades\DB,
    Str,
};
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Throwable;

/**
 * @OA\Tag(
 *     name="Providers",
 * )
 */
class ProviderController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    /**
     * @OA\Get(
     *     path="/api/providers",
     *     tags={"Providers"},
     *     summary="Listar fornecedores",
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
     *                     @OA\Property(property="cnpj", type="string"),
     *                     @OA\Property(property="email", type="string"),
     *                     @OA\Property(property="phone", type="string"),
     *                     @OA\Property(property="cellphone", type="string"),
     *                     @OA\Property(property="logo", type="string"),
     *                     @OA\Property(property="logo_url", type="string"),
     *                     @OA\Property(
     *                         property="address",
     *                         type="object",
     *                         @OA\Property(property="zipcode", type="string"),
     *                         @OA\Property(property="street", type="string"),
     *                         @OA\Property(property="neighborhood", type="string"),
     *                         @OA\Property(property="number", type="string"),
     *                         @OA\Property(property="state", type="string"),
     *                         @OA\Property(property="city", type="string"),
     *                         @OA\Property(property="complement", type="string")
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
        $providers = Provider::get();

        return IndexResource::collection($providers);
    }

    /**
     * @OA\Post(
     *     path="/api/providers",
     *     tags={"Providers"},
     *     summary="Cadastrar um novo fornecedor",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "logo", "address"},
     *             @OA\Property(property="name", type="string", example="Forncedor 1"),
     *             @OA\Property(property="cnpj", type="string", example="01234567890123"),
     *             @OA\Property(property="email", type="string", example="email@example.com"),
     *             @OA\Property(property="phone", type="string", example="012345678901234"),
     *             @OA\Property(property="cellphone", type="string", example="012345678901234"),
     *             @OA\Property(property="logo", type="string", format="binary"),
     *             @OA\Property(
     *                 property="address",
     *                 type="object",
     *                 @OA\Property(property="zipcode", type="string", example="0123456"),
     *                 @OA\Property(property="street", type="string", example="Rua 1"),
     *                 @OA\Property(property="number", type="integer", example="123"),
     *                 @OA\Property(property="neighborhood", type="string", example="Bairro 1"),
     *                 @OA\Property(property="state", type="string", example="SP"),
     *                 @OA\Property(property="city", type="string", example="São Paulo"),
     *                 @OA\Property(property="complement", type="string", example="Complemento 1")
     *             )
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
            $imageName = Str::random(32) . "." . $validated['logo']->getClientOriginalExtension();

            $this
                ->firebaseStorage
                ->uploadFile($validated['logo'], $imageName);

            $provider = Provider::create([
                'name' => $validated['name'],
                'cnpj' => $validated['cnpj'] ?? null,
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'cellphone' => $validated['cellphone'] ?? null,
                'logo' => $imageName,
            ]);

            $provider
                ->addresses()
                ->create($validated['address']);

            DB::commit();

            return response()->json([
                'data' => [
                    'id' => $provider->id,
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
     *     path="/api/providers/{provider}",
     *     tags={"Providers"},
     *     summary="Visualizar os dados de um fornecedor",
     *     @OA\Parameter(
     *         name="provider",
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
     *                     @OA\Property(property="cnpj", type="string"),
     *                     @OA\Property(property="email", type="string"),
     *                     @OA\Property(property="phone", type="string"),
     *                     @OA\Property(property="cellphone", type="string"),
     *                     @OA\Property(property="logo", type="string"),
     *                     @OA\Property(property="logo_url", type="string"),
     *                     @OA\Property(
     *                         property="address",
     *                         type="object",
     *                         @OA\Property(property="zipcode", type="string"),
     *                         @OA\Property(property="street", type="string"),
     *                         @OA\Property(property="neighborhood", type="string"),
     *                         @OA\Property(property="number", type="string"),
     *                         @OA\Property(property="state", type="string"),
     *                         @OA\Property(property="city", type="string"),
     *                         @OA\Property(property="complement", type="string")
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
    public function show(Provider $provider)
    {
        return app(ShowResource::class, ['resource' => $provider]);
    }

    /**
     * @OA\Put(
     *     path="/api/providers/{provider}",
     *     tags={"Providers"},
     *     summary="Atualizar um fornecedor",
     *     @OA\Parameter(
     *         name="provider",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Forncedor 1"),
     *             @OA\Property(property="cnpj", type="string", example="01234567890123"),
     *             @OA\Property(property="email", type="string", example="email@example.com"),
     *             @OA\Property(property="phone", type="string", example="012345678901234"),
     *             @OA\Property(property="cellphone", type="string", example="012345678901234"),
     *             @OA\Property(property="logo", type="string", format="binary"),
     *             @OA\Property(
     *                 property="address",
     *                 type="object",
     *                 @OA\Property(property="zipcode", type="string", example="0123456"),
     *                 @OA\Property(property="street", type="string", example="Rua 1"),
     *                 @OA\Property(property="number", type="integer", example="123"),
     *                 @OA\Property(property="neighborhood", type="string", example="Bairro 1"),
     *                 @OA\Property(property="state", type="string", example="SP"),
     *                 @OA\Property(property="city", type="string", example="São Paulo"),
     *                 @OA\Property(property="complement", type="string", example="Complemento 1")
     *             )
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
    public function update(StoreRequest $request, Provider $provider)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $provider->update([
                'name' => $validated['name'],
                'cnpj' => $validated['cnpj'] ?? null,
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'cellphone' => $validated['cellphone'] ?? null,
            ]);

            $provider
                ->addresses()
                ->update($validated['address']);

            // Verifica se foi feito upload de uma nova imagem
            if ($request->hasFile('logo')) {
                $this
                    ->firebaseStorage
                    ->deleteFile($provider->logo);

                $imageName = Str::random(32) . "." . $validated['logo']->getClientOriginalExtension();

                $this
                    ->firebaseStorage
                    ->uploadFile($validated['logo'], $imageName);

                $provider->update(['logo' => $imageName]);
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
     *     path="/api/providers/{provider}",
     *     tags={"Providers"},
     *     summary="Deletar um fornecedor",
     *     @OA\Parameter(
     *         name="provider",
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
    public function destroy(Provider $provider)
    {
        $this
            ->firebaseStorage
            ->deleteFile($provider->logo);

        $provider->delete();

        $provider
            ->addresses()
            ->delete();

        return response()->noContent();
    }
}
