<?php

namespace App\Http\Controllers;

use App\Exceptions\ResponseException;
use App\Helpers\ExceptionHelper;
use App\Http\Requests\Provider\StoreRequest;
use App\Http\Resources\Provider\{
    IndexResource,
    ShowResource,
};
use App\Models\Provider;
use App\Services\FirebaseStorageService;
use Illuminate\Support\{
    Facades\DB,
    Str,
};
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Throwable;

class ProviderController extends Controller
{
    protected $firebaseStorage;

    public function __construct(FirebaseStorageService $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    public function index()
    {
        $providers = Provider::get();

        return IndexResource::collection($providers);
    }

    public function store(StoreRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $imageName = Str::random(32) . "." . $validated['logo']->getClientOriginalExtension();

            $this
                ->firebaseStorage
                ->uploadFile($validated['logo'], $imageName);

            $provider = Provider::create([
                'name' => $validated['name'],
                'cnpj' => $validated['cnpj'] ?? null,
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'cellphone' => $validated['cellphone'] ?? null,
                'logo' => $imageName,
            ]);

            $provider
                ->addresses()
                ->create($validated['address']);

            DB::commit();

            return response()->json([
                'data' => [
                    'id' => $provider->id,
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

    public function show(Provider $provider)
    {
        return app(ShowResource::class, ['resource' => $provider]);
    }

    public function update(StoreRequest $request, Provider $provider)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $provider->update([
                'name' => $validated['name'],
                'cnpj' => $validated['cnpj'] ?? null,
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'cellphone' => $validated['cellphone'] ?? null,
            ]);

            $provider
                ->addresses()
                ->update($validated['address']);

            // Verifica se foi feito upload de uma nova imagem
            if ($request->hasFile('logo')) {
                $this
                    ->firebaseStorage
                    ->deleteFile($provider->logo);

                $imageName = Str::random(32) . "." . $validated['logo']->getClientOriginalExtension();

                $this
                    ->firebaseStorage
                    ->uploadFile($validated['logo'], $imageName);

                $provider->update(['logo' => $imageName]);
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

    public function destroy(Provider $provider)
    {
        $this
            ->firebaseStorage
            ->deleteFile($provider->logo);

        $provider->delete();

        $provider
            ->addresses()
            ->delete();

        return response()->noContent();
    }
}
