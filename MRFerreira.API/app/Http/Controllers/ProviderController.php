<?php

namespace App\Http\Controllers;

use App\Http\Requests\Provider\StoreRequest;
use App\Http\Resources\Provider\{
    IndexResource,
    ShowResource,
};
use App\Models\Provider;
use App\Services\FirebaseStorageService;
use Illuminate\Support\{
    Facades\Log,
    Str,
};
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProviderController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    public function index()
    {
        try {
            $providers = Provider::get();

            return IndexResource::collection($providers);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar empresas: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao buscar empresas: ' . $e->getMessage()], 500);
        }
    }

    public function store(StoreRequest $request)
    {
        try {
            $existingCompany = Provider::where('cnpj', $request->cnpj)->first();

            if ($existingCompany) {
                return response()->json([
                    'message' => 'Fornecedor já registrado.'
                ], 400);
            }

            $imageName = Str::random(32) . "." . $request->logo->getClientOriginalExtension();
            $imageUrl = $this->firebaseStorage->uploadFile($request->logo, $imageName);

            Provider::create([
                'name' => $request->name,
                'cnpj' => $request->cnpj ?? null,
                'street' => $request->street,
                'neighborhood' => $request->neighborhood,
                'number' => $request->number,
                'zipcode' => $request->zipcode,
                'city' => $request->city,
                'state' => $request->state,
                'complement' => $request->complement ?? null,
                'email' => $request->email,
                'phone' => $request->phone ?? null,
                'cellphone' => $request->cellphone ?? null,
                'logo' => $imageName,
            ]);

            return response()->json([
                'message' => "Empresa cadastrada com sucesso!",
                'imageUrl' => $imageUrl
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao cadastrar empresa: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao cadastrar empresa: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $provider = Provider::findOrFail($id);

            return app(ShowResource::class, ['resource' => $provider]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Empresa não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao retornar empresa: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornar empresa: ' . $e->getMessage()], 500);
        }
    }

    public function update(StoreRequest $request, $id)
    {
        try {
            $provider = Provider::findOrFail($id);

            $provider->update([
                'name' => $request->name,
                'cnpj' => $request->cnpj,
                'street' => $request->street,
                'neighborhood' => $request->neighborhood,
                'number' => $request->number,
                'zipcode' => $request->zipcode,
                'city' => $request->city,
                'state' => $request->state,
                'complement' => $request->complement,
                'email' => $request->email,
                'phone' => $request->phone,
                'cellphone' => $request->cellphone,
            ]);

            // Verifica se foi feito upload de uma nova imagem
            if ($request->hasFile('logo')) {
                $this->firebaseStorage->deleteFile($provider->logo);
                $imageName = Str::random(32) . "." . $request->logo->getClientOriginalExtension();
                $imageUrl = $this->firebaseStorage->uploadFile($request->logo, $imageName);
                $provider->update(['logo' => $imageName]);
            }

            // Defina $imageUrl para evitar erro de variável não definida
            $imageUrl = isset($imageUrl) ? $imageUrl : null;

            return response()->json([
                'message' => "Fornecedor atualizado com sucesso!",
                'provider' => $provider,
                'imageUrl' => $imageUrl,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Empresa não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar empresa: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao atualizar empresa: ' . $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $provider = Provider::findOrFail($id);

            $this->firebaseStorage->deleteFile($provider->logo);
            $provider->delete();

            return response()->json([
                'message' => 'Empresa excluída com sucesso!'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Empresa não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir empresa: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao excluir empresa: ' . $e->getMessage()], 500);
        }
    }
}
