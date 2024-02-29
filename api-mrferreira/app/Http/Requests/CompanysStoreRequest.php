<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanysStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'cnpj' => 'required|string',
            'road' => 'required|string',
            'neighborhood' => 'required|string',
            'number' => 'required|integer',
            'cep' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'complement' => 'nullable|string',
            'email' => 'required|string',
            'phone' => 'nullable|string',
            'cellphone' => 'nullable|string',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required!',
            'cnpj.required' => 'CNPJ is required!',
            'road.required' => 'Road is required!',
            'neighborhood.required' => 'Neighborhood is required!',
            'number.required' => 'Number is required!',
            'cep.required' => 'CEP is required!',
            'city.required' => 'City is required!',
            'state.required' => 'State is required!',
            'email.required' => 'Email is required!',
            'logo.required' => 'Logo is required!'
        ];
    }
}
