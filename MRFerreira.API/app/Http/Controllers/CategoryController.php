<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreRequest;
use App\Http\Resources\Category\{
    IndexResource,
    ShowResource,
};
use App\Models\Category;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::get();

        return IndexResource::collection($categories);
    }

    public function store(StoreRequest $request)
    {
        $validated = $request->validated();

        $category = Category::create([
            'name' => $validated['name'],
        ]);

        return response()->json([
            'data' => [
                'id' => $category->id,
            ],
        ], HttpResponse::HTTP_CREATED);
    }

    public function show(Category $category)
    {
        return app(ShowResource::class, ['resource' => $category]);
    }

    public function update(StoreRequest $request, $id)
    {
        $category = Category::findOrFail($id);

        $category->update([
            'name' => $request->name,
        ]);

        return response()->noContent();
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->noContent();
    }
}
