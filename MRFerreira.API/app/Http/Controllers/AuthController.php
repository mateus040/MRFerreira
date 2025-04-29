<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\MeResource;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\{
    Auth,
    Log,
};
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users|max:255',
                'password' => 'required|string|min:6',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password), // TODO: utilizar o HASH direto na model
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

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Credênciais inválidas.'], 401);
            }

            $user = $request->user();

            $token = $user->createToken('token-name')->plainTextToken;

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

    public function logout(Request $request)
    {
        try {
            $request
                ->user()
                ->tokens() // TODO: aqui provavelmente ele está excluido todos os tokens do usuário
                ->delete();

            return response()->json([
                'message' => 'Deslogado com sucesso!'
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao deslogar: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao deslogar: ' . $e->getMessage()], 500);
        }
    }

    public function getUser()
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
