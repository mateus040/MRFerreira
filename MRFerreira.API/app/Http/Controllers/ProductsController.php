<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreRequest;
use App\Http\Resources\Product\ShowResource;
use App\Models\{
    Category,
    Provider,
    Product,
};
use Illuminate\Support\{
    Facades\Log,
    Str,
};
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Services\FirebaseStorageService;

class ProductController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    public function index()
    {
        try {
            $products = Product::with(['provider', 'category'])->get();

            return response()->json([
                'results' => $products,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar produtos: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao buscar produtos: ' . $e->getMessage()], 500);
        }
    }

    public function store(StoreRequest $request)
    {
        try {
            $existingProduct = Product::where('nome', $request->nome)->first();

            if ($existingProduct) {
                return response()->json([
                    'message' => 'Produto já registrado.'
                ], 400);
            }

            $imageName = Str::random(32) . "." . $request->foto->getClientOriginalExtension();
            $imageUrl = $this->firebaseStorage->uploadFile($request->foto, $imageName);

            Product::create([
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
            $product = Product::with(['category', 'provider'])->findOrFail($id);

            return app(ShowResource::class, ['resource' => $product]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Produto não encontrado.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao retornar produto: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornar produtos: ' . $e->getMessage()], 500);
        }
    }


    public function update(StoreRequest $request, $id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json([
                    'message' => 'Produto não encontrado.'
                ], 404);
            }

            $product->update([
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
                $this->firebaseStorage->deleteFile($product->foto);
                $imageName = Str::random(32) . "." . $request->foto->getClientOriginalExtension();
                $imageUrl = $this->firebaseStorage->uploadFile($request->foto, $imageName);
                $product->update(['foto' => $imageName]);
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
            $product = Product::findOrFail($id);

            $this
                ->firebaseStorage
                ->deleteFile($product->foto);

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
            $products = Product::where('id_provider', $id)->with(['provider', 'category'])->get();

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
            $products = Product::where('id_category', $id)->with(['provider', 'category'])->get();

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
            $products_count = Product::count();
            $providers_count = Provider::count();
            $categories_count = Category::count();

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
