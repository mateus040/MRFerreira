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
use Illuminate\Support\Facades\DB;

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
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $existingCompany = Provider::where('cnpj', $validated['cnpj'])->first();

            if ($existingCompany) {
                return response()->json([
                    'message' => 'Fornecedor já registrado.'
                ], 400);
            }

            $imageName = Str::random(32) . "." . $validated['logo']->getClientOriginalExtension();
            $imageUrl = $this
                ->firebaseStorage
                ->uploadFile($validated['logo'], $imageName);

            $provider = Provider::create([
                'name' => $validated['name'],
                'cnpj' => $validated['cnpj'] ?? null,
                'email' => $validated['email'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'cellphone' => $validated['cellphone'] ?? null,
                'logo' => $imageName,
            ]);

            $provider
                ->addresses()
                ->create([
                    'zipcode' => $validated['zipcode'],
                    'street' => $validated['street'],
                    'neighborhood' => $validated['neighborhood'],
                    'number' => $validated['number'],
                    'state' => $validated['state'],
                    'city' => $validated['city'],
                    'complement' => $validated['complement'],
                ]);

            DB::commit();

            return response()->json([
                'message' => "Empresa cadastrada com sucesso!",
                'imageUrl' => $imageUrl
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

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
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $provider = Provider::findOrFail($id);

            $provider->update([
                'name' => $validated['name'],
                'cnpj' => $validated['cnpj'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'cellphone' => $validated['cellphone'],
            ]);

            // TODO: verificar se é obrigatório atualizar o endereço
            $provider
                ->addresses()
                ->update([
                    'zipcode' => $validated['zipcode'],
                    'street' => $validated['street'],
                    'neighborhood' => $validated['neighborhood'],
                    'number' => $validated['number'],
                    'state' => $validated['state'],
                    'city' => $validated['city'],
                    'complement' => $validated['complement'],
                ]);

            // Verifica se foi feito upload de uma nova imagem
            if ($request->hasFile('logo')) {
                $this
                    ->firebaseStorage
                    ->deleteFile($provider->logo);

                $imageName = Str::random(32) . "." . $validated['logo']->getClientOriginalExtension();

                $imageUrl = $this
                    ->firebaseStorage
                    ->uploadFile($validated['logo'], $imageName);

                $provider->update(['logo' => $imageName]);
            }

            // Defina $imageUrl para evitar erro de variável não definida
            $imageUrl = isset($imageUrl) ? $imageUrl : null;

            DB::commit();

            return response()->json([
                'message' => "Fornecedor atualizado com sucesso!",
                'provider' => $provider,
                'imageUrl' => $imageUrl,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Empresa não encontrada.'], 404);
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Erro ao atualizar empresa: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao atualizar empresa: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $provider = Provider::findOrFail($id);

            $this
                ->firebaseStorage
                ->deleteFile($provider->logo);
            
            $provider->delete();

            return response()->noContent();
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Empresa não encontrada.'], 404);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir empresa: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao excluir empresa: ' . $e->getMessage()], 500);
        }
    }
}
