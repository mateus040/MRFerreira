<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\{
    PatchRequest,
    StoreRequest,
};
use App\Http\Resources\User\{
    IndexResource,
    ShowResource,
};
use App\Models\User;
use Illuminate\Http\{
    JsonResponse,
    Response,
};
use Illuminate\Http\Resources\Json\{
    AnonymousResourceCollection,
    JsonResource,
};
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class UserController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $users = User::all();

        return IndexResource::collection($users);
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        return response()->json([
            'data' => [
                'id' => $user->id
            ],
        ], HttpResponse::HTTP_CREATED);
    }

    public function show(User $user): JsonResource
    {
        return app(ShowResource::class, ['resource' => $user]);
    }

    public function patch(PatchRequest $request, User $user): Response
    {
        $validated = $request->validated();

        $user->update($validated);

        return response()->noContent();
    }

    public function destroy(User $user): Response
    {
        $user->delete();

        return response()->noContent();
    }
}
