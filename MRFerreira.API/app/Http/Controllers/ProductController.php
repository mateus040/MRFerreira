<?php

namespace App\Http\Controllers;

use App\Exceptions\ResponseException;
use App\Helpers\ExceptionHelper;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Resources\Product\{
    IndexResource,
    ShowResource,
};
use App\Models\{
    Category,
    Provider,
    Product,
};
use Illuminate\Support\{
    Facades\Log,
    Str,
};
use App\Services\FirebaseStorageService;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProductController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    public function index()
    {
        $products = Product::with(['provider', 'category'])->get();

        return IndexResource::collection($products);
    }

    public function store(StoreRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $imageName = Str::random(32) . "." . $validated['photo']->getClientOriginalExtension();

            $this
                ->firebaseStorage
                ->uploadFile($validated['photo'], $imageName);

            $product = Product::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'length' => $validated['length'] ?? "",
                'height' => $validated['height'] ?? "",
                'depth' => $validated['depth'] ?? "",
                'weight' => $validated['weight'] ?? "",
                'line' => $validated['line'] ?? "",
                'materials' => $validated['materials'] ?? "",
                'photo' => $imageName,
                'id_provider' => $validated['id_provider'],
                'id_category' => $validated['id_category'],
            ]);

            DB::commit();

            return response()->json([
                'data' => [
                    'id' => $product->id,
                ],
            ], HttpResponse::HTTP_CREATED);
        } catch (Throwable $th) {
            DB::rollBack();

            throw app(
                ResponseException::class,
                ['message' => ExceptionHelper::getExceptionMessage($th)],
            );
        }
    }

    public function show(Product $product)
    {
        return app(ShowResource::class, ['resource' => $product]);
    }


    public function update(StoreRequest $request, Product $product)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $product->update([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'length' => $validated['length'] ?? "",
                'height' => $validated['height'] ?? "",
                'depth' => $validated['depth'] ?? "",
                'weight' => $validated['weight'] ?? "",
                'line' => $validated['line'] ?? "",
                'materials' => $validated['materials'] ?? "",
                'id_provider' => $validated['id_provider'],
                'id_category' => $validated['id_category'],
            ]);

            if ($request->hasFile('photo')) {
                $this
                    ->firebaseStorage
                    ->deleteFile($product->photo);

                $imageName = Str::random(32) . "." . $validated['photo']->getClientOriginalExtension();

                $this
                    ->firebaseStorage
                    ->uploadFile($validated['photo'], $imageName);

                $product->update(['photo' => $imageName]);
            }

            DB::commit();

            return response()->noContent();
        } catch (Throwable $th) {
            DB::rollBack();

            throw app(
                ResponseException::class,
                ['message' => ExceptionHelper::getExceptionMessage($th)],
            );
        }
    }

    public function destroy(Product $product)
    {
        $this
            ->firebaseStorage
            ->deleteFile($product->photo);

        $product->delete();

        return response()->noContent();
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
