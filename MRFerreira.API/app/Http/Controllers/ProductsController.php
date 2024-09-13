<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Http\Requests\ProductsStoreRequest;
use App\Models\Categories;
use App\Models\Providers;
use Illuminate\Support\Str;
use App\Services\FirebaseStorageService;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductsController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    public function index()
    {
        try {
            $products = Products::with(['provider', 'category'])->get();


            return response()->json([
                'results' => $products,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar produtos: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao buscar produtos: ' . $e->getMessage()], 500);
        }
    }

    public function store(ProductsStoreRequest $request)
    {
        try {
            $existingProduct = Products::where('nome', $request->nome)->first();

            if ($existingProduct) {
                return response()->json([
                    'message' => 'Produto já registrado.'
                ], 400);
            }

            $imageName = Str::random(32) . "." . $request->foto->getClientOriginalExtension();
            $imageUrl = $this->firebaseStorage->uploadFile($request->foto, $imageName);

            Products::create([
                'nome' => $request->nome,
                'descricao' => $request->descricao,
                'comprimento' => $request->comprimento ?? "",
                'altura' => $request->altura ?? "",
                'profundidade' => $request->profundidade ?? "",
                'peso' => $request->peso ?? "",
                'linha' => $request->linha ?? "",
                'materiais' => $request->materiais ?? "",
                'foto' => $imageName,
                'id_provider' => $request->id_provider,
                'id_category' => $request->id_category,
            ]);

            return response()->json([
                'message' => "Produto cadastrado com sucesso!",
                'imageUrl' => $imageUrl
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao cadastrar produto: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao cadastrar produto: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $products = Products::with(['category', 'provider'])->findOrFail($id);

            return response()->json([
                'results' => $products
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Produto não encontrado.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao retornar produto: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornar produtos: ' . $e->getMessage()], 500);
        }
    }


    public function update(ProductsStoreRequest $request, $id)
    {
        try {
            $products = Products::find($id);
            if (!$products) {
                return response()->json([
                    'message' => 'Produto não encontrado.'
                ], 404);
            }

            $products->update([
                'nome' => $request->nome,
                'descricao' => $request->descricao,
                'comprimento' => $request->comprimento ?? "",
                'altura' => $request->altura ?? "",
                'profundidade' => $request->profundidade ?? "",
                'peso' => $request->peso ?? "",
                'linha' => $request->linha ?? "",
                'materiais' => $request->materiais ?? "",
                'id_provider' => $request->id_provider,
                'id_category' => $request->id_category,
            ]);

            if ($request->hasFile('foto')) {
                $this->firebaseStorage->deleteFile($products->foto);
                $imageName = Str::random(32) . "." . $request->foto->getClientOriginalExtension();
                $imageUrl = $this->firebaseStorage->uploadFile($request->foto, $imageName);
                $products->update(['foto' => $imageName]);
            }

            $imageUrl = isset($imageUrl) ? $imageUrl : null;

            return response()->json([
                'message' => "Produto atualizado com sucesso!",
                'imageUrl' => $imageUrl,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Produto não encontrado.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar produto: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao atualizar produto: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Products::findOrFail($id);

            $this->firebaseStorage->deleteFile($product->foto);

            $product->delete();

            return response()->json([
                'message' => 'Produto deletado com sucesso!'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Produto não encontrado.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir produto: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao excluir produto: ' . $e->getMessage()], 500);
        }
    }

    public function productsByCompany($id)
    {
        try {
            $products = Products::where('id_provider', $id)->with(['provider', 'category'])->get();

            return response()->json([
                'results' => $products,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao retornas produtos: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornar produtos: ' . $e->getMessage()], 500);
        }
    }

    public function productsByCategory($id)
    {
        try {
            $products = Products::where('id_category', $id)->with(['provider', 'category'])->get();

            return response()->json([
                'results' => $products,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao retornar produtos: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornos produtos: ' . $e->getMessage()], 500);
        }
    }

    public function getCards()
    {
        try {
            $products_count = Products::count();
            $providers_count = Providers::count();
            $categories_count = Categories::count();

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
