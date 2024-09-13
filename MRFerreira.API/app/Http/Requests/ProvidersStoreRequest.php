<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProvidersStoreRequest extends FormRequest
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
            'nome' => 'required|string',
            'cnpj' => 'nullable|string',
            'rua' => 'required|string',
            'bairro' => 'required|string',
            'numero' => 'required|integer',
            'cep' => 'required|string',
            'cidade' => 'required|string',
            'estado' => 'required|string',
            'complemento' => 'nullable|string',
            'email' => 'required|string',
            'telefone' => 'nullable|string',
            'celular' => 'nullable|string',
            'logo' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
        ];
    }

    public function messages()
    {
        return [
            'nome.required' => 'Nome é obrigatório',
            'rua.required' => 'Rua é obrigatório!',
            'bairro.required' => 'Bairro é obrigatório!',
            'numero.required' => 'Número é obrigatório!',
            'cep.required' => 'CEP é obrigatório!',
            'cidade.required' => 'Cidade é obrigatório!',
            'estado.required' => 'Estado é obrigatório!',
            'email.required' => 'Email é obrigatório!',
            'logo.required' => 'Logo é obrigatório!',
            'logo.mimes' => 'Formato de imagem inválido, deve ser jpeg, png, jpg, gif ou svg',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => $validator->errors()
        ], 422));
    }
}
