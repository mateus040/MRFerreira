<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Companys;
use App\Http\Requests\CompanysStoreRequest;
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

            $logoPath = $request->file('logo')->store('logos', 'public');  

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
                'logo' => $logoPath,
            ]);

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
                    'message' => 'Company Not Found.'
                ], 404);
            }

            if ($request->hasFile('logo')) {
                if ($companys->logo) {
                    Storage::disk('public')->delete($companys->logo);
                }

                $logoPath = $request->file('logo')->store('logos', 'public');
                $companys->logo = $logoPath;
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

            $companys->save();

            return response()->json([
                'message' => 'Company successfully updated.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went really wrong!'
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

        $companys->delete();

        return response()->json([
            'message' => 'Company successfully deleted.'
        ], 200);
    }
}
