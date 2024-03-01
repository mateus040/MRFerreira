<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Companys;
use App\Http\Requests\CompanysStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class CompanysController extends Controller
{
    public function index()
    {
        $companys = Companys::all();

        // Return Json Response
        return response()->json([
            'results' => $companys,
        ], 200);
    }

    public function store(CompanysStoreRequest $request)
    {
        // Check if the company already exists via CNPJ
        $existingCompany = Companys::where('cnpj', $request->cnpj)->first();

        if ($existingCompany) {
            return response()->json([
                'message' => 'Company already registered.'
            ], 400);
        }

        try {

            $imageName = Str::random(32) . "." . $request->logo->getClientOriginalExtension();

            Companys::create([
                'name' => $request->name,
                'cnpj' => $request->cnpj,
                'road' => $request->road,
                'neighborhood' => $request->neighborhood,
                'number' => $request->number,
                'cep' => $request->cep,
                'city' => $request->city,
                'state' => $request->state,
                'complement' => $request->complement ?? null,
                'email' => $request->email,
                'phone' => $request->phone ?? null,
                'cellphone' => $request->cellphone ?? null,
                'logo' => $imageName,
            ]);

            Storage::disk('public')->put($imageName, file_get_contents($request->logo));

            // Return Json Response
            return response()->json([
                'message' => "Company successfully created."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    public function show($id)
    {
        $companys = Companys::find($id);

        if (!$companys) {
            return response()->json([
                'message' => 'Company Not Found.'
            ], 404);
        }

        return response()->json([
            'companys' => $companys
        ], 200);
    }

    public function update(CompanysStoreRequest $request, $id)
    {
        try {
            $companys = Companys::find($id);
            if (!$companys) {
                return response()->json([
                    'message' => 'Company not found.'
                ], 404);
            }

            $companys->name = $request->name;
            $companys->cnpj = $request->cnpj;
            $companys->road = $request->road;
            $companys->neighborhood = $request->neighborhood;
            $companys->number = $request->number;
            $companys->cep = $request->cep;
            $companys->city = $request->city;
            $companys->state = $request->state;
            $companys->complement = $request->complement;
            $companys->email = $request->email;
            $companys->phone = $request->phone;
            $companys->cellphone = $request->cellphone;

            if ($request->logo) {
                $storage = Storage::disk('public');

                if ($storage->exists($companys->logo));
                ($storage->delete($companys->logo));

                $imageName = Str::random(32) . "." . $request->logo->getClientOriginalExtension();
                $companys->logo = $imageName;

                $storage->put($imageName, file_get_contents($request->logo));
            }

            $companys->save();

            return response()->json([
                'message' => "Company successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    public function destroy($id)
    {
        $companys = Companys::find($id);

        if (!$companys) {
            return response()->json([
                'message' => 'Company Not Found.'
            ], 404);
        }

        // Public storage
        $storage = Storage::disk('public');

        // Iamge delete
        if ($storage->exists($companys->logo))
            $storage->delete($companys->logo);

        $companys->delete();

        return response()->json([
            'message' => 'Company successfully deleted.'
        ], 200);
    }
}
