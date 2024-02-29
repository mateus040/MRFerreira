<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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
                'message' => 'Usuário cadastrado com sucesso!', 'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ocorreu um erro durante o registro...',
                'error' => $e->getMessage()
            ], 500);
        }
        
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if (!Auth::attempt($request->only('email', 'password'))) {
                throw ValidationException::withMessages([
                    'email' => ['Credenciais inválidas!'],
                ])->status(401);
            }

            $user = $request->user();

            return response()->json([
                'token' => $user->createToken('token-name')->plainTextToken
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao realizar o login...',
                'error' => $e->getMessage()
            ], 500);
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
            return response()->json([
                'message' => 'Erro ao deslogar...',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUser(Request $request)
    {
        try {
            return $request->user();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao buscar os dados do usuário...',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
