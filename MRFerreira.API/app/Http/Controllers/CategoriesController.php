<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreRequest;
use App\Http\Resources\Category\{
    IndexResource,
    ShowResource,
};
use App\Models\Category;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::get();

            return IndexResource::collection($categories);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar categorias: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao buscar categorias: ' . $e->getMessage()], 500);
        }
    }

    public function store(StoreRequest $request)
    {
        try {
            $existingCategory = Category::where('name', $request->name)->first();

            if ($existingCategory) {
                return response()->json([
                    'message' => 'Categoria já registrada.'
                ], 400);
            }

            Category::create([
                'name' => $request->name,
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
            $category = Category::findOrFail($id);

            return app(ShowResource::class, ['resource' => $category]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Categoria não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao retornar categoria: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornar categoria: ' . $e->getMessage()], 500);
        }
    }

    public function update(StoreRequest $request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            $category->update([
                'name' => $request->name,
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
            $category = Category::findOrFail($id);

            $category->delete();

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
