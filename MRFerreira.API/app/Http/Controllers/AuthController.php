<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
                'password' => bcrypt($request->password),
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
            $request->user()->tokens()->delete();

            return response()->json([
                'message' => 'Deslogado com sucesso!'
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao deslogar: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao deslogar: ' . $e->getMessage()], 500);
        }
    }

    public function getUser(Request $request)
    {
        try {
            return $request->user();
        } catch (\Exception $e) {
            Log::error('Erro ao obter usuário: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao obter usuário: ' . $e->getMessage()], 500);
        }
    }
}
