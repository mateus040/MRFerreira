<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProvidersStoreRequest;
use App\Http\Resources\ProviderResource;
use App\Models\Providers;
use Illuminate\Support\Str;
use App\Services\FirebaseStorageService;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProvidersController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    public function index()
    {
        try {
            $providers = Providers::get();


            return response()->json([
                'results' => $providers,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar empresas: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao buscar empresas: ' . $e->getMessage()], 500);
        }
    }

    public function store(ProvidersStoreRequest $request)
    {
        try {
            $existingCompany = Providers::where('cnpj', $request->cnpj)->first();

            if ($existingCompany) {
                return response()->json([
                    'message' => 'Fornecedor já registrado.'
                ], 400);
            }

            $imageName = Str::random(32) . "." . $request->logo->getClientOriginalExtension();
            $imageUrl = $this->firebaseStorage->uploadFile($request->logo, $imageName);

            Providers::create([
                'nome' => $request->nome,
                'cnpj' => $request->cnpj ?? null,
                'rua' => $request->rua,
                'bairro' => $request->bairro,
                'numero' => $request->numero,
                'cep' => $request->cep,
                'cidade' => $request->cidade,
                'estado' => $request->estado,
                'complemento' => $request->complemento ?? null,
                'email' => $request->email,
                'telefone' => $request->telefone ?? null,
                'celular' => $request->celular ?? null,
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
            $providers = Providers::findOrFail($id);

            return response()->json([
                'results' => $providers
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Empresa não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao retornar empresa: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao retornar empresa: ' . $e->getMessage()], 500);
        }
    }

    public function update(ProvidersStoreRequest $request, $id)
    {
        try {
            $provider = Providers::findOrFail($id);

            $provider->update([
                'nome' => $request->nome,
                'cnpj' => $request->cnpj,
                'rua' => $request->rua,
                'bairro' => $request->bairro,
                'numero' => $request->numero,
                'cep' => $request->cep,
                'cidade' => $request->cidade,
                'estado' => $request->estado,
                'complemento' => $request->complemento,
                'email' => $request->email,
                'telefone' => $request->telefone,
                'celular' => $request->celular,
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
            $provider = Providers::findOrFail($id);

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
