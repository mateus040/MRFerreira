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
    Log,
};
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $validated = $request->validated();

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']), // TODO: utilizar o HASH direto na model
            ]);

            return response()->json([
                'message' => 'Usuário cadastrado com sucesso!',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao registrar usuário: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao registrar usuário: ' . $e->getMessage()], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $validated = $request->validated();

            $user = User::where('email', $validated['email'])->first();

            if (!$user || !Hash::check($validated['password'], $user['password'])) {
                return response()->json([
                    'message' => 'Credenciais inválidas',
                ], HttpResponse::HTTP_UNAUTHORIZED);
            }

            $token = $user
                ->createToken('token-name')
                ->plainTextToken;

            $expiration = Carbon::now()->addMinutes(config('sanctum.expiration'));

            return response()->json([
                'token' => $token,
                'expiresIn' => $expiration->toDateTimeString()
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao logar: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao logar: ' . $e->getMessage()], 500);
        }
    }

    public function logout()
    {
        try {
            $user = Auth::user();

            $user
                ->currentAccessToken()
                ->delete();

            return response()->noContent();
        } catch (\Exception $e) {
            Log::error('Erro ao deslogar: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao deslogar: ' . $e->getMessage()], 500);
        }
    }

    public function me()
    {
        try {
            $user = Auth::user();

            return app(MeResource::class, ['resource' => $user]);
        } catch (\Exception $e) {
            Log::error('Erro ao obter usuário: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao obter usuário: ' . $e->getMessage()], 500);
        }
    }
}
