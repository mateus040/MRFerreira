<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Http\Requests\ProductsStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Products::all();

        return response()->json([
            'results' => $products,
        ], 200);
    }

    public function store(ProductsStoreRequest $request)
    {
        $existingProduct = Products::where('name', $request->name)->first();

        if ($existingProduct) {
            return response()->json([
                'message' => 'Product already registered.'
            ], 400);
        }

        try {
            $imageName = Str::random(32) . "." . $request->photo->getClientOriginalExtension();

            Products::create([
                'name' => $request->name,
                'description' => $request->description,
                'length' => $request->length,
                'height' => $request->height,
                'depth' => $request->depth,
                'weight' => $request->weight,
                'photo' => $imageName,
                'id_company' => $request->id_company,
            ]);

            Storage::disk('public')->put($imageName, file_get_contents($request->photo));

            return response()->json([
                'message' => "Product successfully created."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong"
            ], 500);
        }
    }

    public function show($id)
    {
        $products = Products::find($id);

        if (!$products) {
            return response()->json([
                'message' => 'Product Not Found.'
            ], 404);
        }

        return response()->json([
            'products' => $products
        ], 200);
    }

    public function productsByCompany($id)
    {
        $products = Products::where('id_company', $id)->get();

        return response()->json([
            'results' => $products,
        ], 200);
    }

    public function update(ProductsStoreRequest $request, $id)
    {
        try {
            $products = Products::find($id);
            if (!$products) {
                return response()->json([
                    'message' => 'Product not found.'
                ], 404);
            }

            $products->name = $request->name;
            $products->description = $request->description;
            $products->length = $request->length;
            $products->height = $request->height;
            $products->depth = $request->depth;
            $products->weight = $request->weight;
            $products->id_company = $request->id_company;

            if ($request->photo) {
                $storage = Storage::disk('public');

                if ($storage->exists($products->photo));
                    ($storage->delete($products->photo));

                $imageName = Str::random(32) . "." . $request->photo->getClientOriginalExtension();
                $products->photo = $imageName;

                $storage->put($imageName, file_get_contents($request->photo));
            }

            $products->save();

            return response()->json([
                'message' => "Product successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    public function destroy($id)
    {
        // Detail 
        $products = Products::find($id);
        if (!$products) {
            return response()->json([
                'message' => 'Product Not Found.'
            ], 404);
        }

        // Public storage
        $storage = Storage::disk('public');

        // Iamge delete
        if ($storage->exists($products->photo))
            $storage->delete($products->photo);

        // Delete Product
        $products->delete();

        // Return Json Response
        return response()->json([
            'message' => "Product successfully deleted."
        ], 200);
    }
}
