<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\MeResource;
use App\Http\Requests\User\{
    RegisterRequest,
    LoginRequest,
};
use App\Models\User;
use Illuminate\Support\Facades\{
    Auth,
    Hash,
};
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        return response()->json([
            'data' => [
                'id' => $user->id
            ],
        ], HttpResponse::HTTP_CREATED);
    }

    public function login(LoginRequest $request)
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

    public function logout()
    {
        $user = Auth::user();

        $user
            ->currentAccessToken()
            ->delete();

        return response()->noContent();
    }

    public function me()
    {
        $user = Auth::user();

        return app(MeResource::class, ['resource' => $user]);
    }
}
