<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriesStoreRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Categories;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoriesController extends Controller
{
    public function index()
    {
        try {
            $categories = Categories::get();

            return response()->json([
                'results' => $categories,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar categorias: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao buscar categorias: ' . $e->getMessage()], 500);
        }
    }

    public function store(CategoriesStoreRequest $request)
    {
        try {
            $existingCategory = Categories::where('nome', $request->nome)->first();

            if ($existingCategory) {
                return response()->json([
                    'message' => 'Categoria já registrada.'
                ], 400);
            }

            Categories::create([
                'nome' => $request->nome,
            ]);

            return response()->json([
                'message' => "Categoria cadastrada com sucesso!",
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao cadastrar categoria: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao cadastrar categoria: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $categories = Categories::findOrFail($id);

            return response()->json([
                'results' => $categories
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Categoria não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao retornar categoria: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornar categoria: ' . $e->getMessage()], 500);
        }
    }

    public function update(CategoriesStoreRequest $request, $id)
    {
        try {
            $categories = Categories::findOrFail($id);

            $categories->update([
                'nome' => $request->nome,
            ]);

            return response()->json([
                'message' => "Categoria atualizada com sucesso!",
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Categoria não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar categoria: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao atualizar categoria: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $categories = Categories::findOrFail($id);

            $categories->delete();

            return response()->json([
                'message' => "Categoria excluída com sucesso!",
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Categoria não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir categoria: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao excluir categoria: ' . $e->getMessage()], 500);
        }
    }
}
