<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\Auth\MeResource;
use App\Http\Requests\User\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\{
    Auth,
    Hash,
};
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Carbon\Carbon;
use Illuminate\Http\{
    JsonResponse,
    Response,
};
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Tag(
 *     name="Auth - Admin",
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/admin/login",
     *     tags={"Auth - Admin"},
     *     summary="Logar como admin",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email, password"},
     *             @OA\Property(property="email", type="string", example="admin@example.com"),
     *             @OA\Property(property="password", type="string", example="123456")
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
     *                 @OA\Property(property="token", type="string"),
     *                 @OA\Property(property="expires_in", type="string", format="date-time", example="2024-07-25T15:30:00")
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
     * )
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user['password'])) {
            return response()->json(['message' => __('auth.failed')], HttpResponse::HTTP_UNAUTHORIZED);
        }

        $token = $user
            ->createToken('token-name')
            ->plainTextToken;

        $expiration = Carbon::now()->addMinutes(config('sanctum.expiration'));

        return response()->json(
            [
                'data' => [
                    'token' => $token,
                    'expires_in' => $expiration->toDateTimeString()
                ],
            ],
        );
    }

    /**
     * @OA\Post(
     *     path="/api/admin/logout",
     *     tags={"Auth - Admin"},
     *     summary="Encerrar sessão",
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
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function logout(): Response
    {
        $user = Auth::user();

        $user
            ->currentAccessToken()
            ->delete();

        return response()->noContent();
    }

    /**
     * @OA\Get(
     *     path="/api/admin/me",
     *     tags={"Auth - Admin"},
     *     summary="Exibir os dados do usuário autenticado",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="name", type="string")
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
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function me(): JsonResource
    {
        $user = Auth::user();

        return app(MeResource::class, ['resource' => $user]);
    }
}
