<?php

namespace App\Http\Requests\Provider;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => [
                'required',
                'string',
                'max:255',
            ],
            'cnpj' =>[
                'nullable',
                'string',
                'regex:/^[0-9]{14}$/',
            ],
            'rua' => [
                'required',
                'string',
                'max:255',
            ],
            'bairro' => [
                'required',
                'string',
                'max:255',
            ],
            'numero' => [
                'required',
                'integer',
            ],
            'cep' => [
                'required',
                'string',
                'regex:/^[0-9]{8}',
            ],
            'cidade' => [
                'required',
                'string',
                'max:255',
            ],
            'estado' => [
                'required',
                'string',
                'max:2',
            ],
            'complemento' => [
                'nullable',
                'string',
            ],
            'email' => [
                'required',
                'string',
                'email',
            ],
            'telefone' => [
                'nullable',
                'string',
            ],
            'celular' => [
                'nullable',
                'string',
            ],
            'logo' => [
                'sometimes',
                'image',
                'mimes:jpeg,png,jpg,gif,svg,webp',
                'max:2048',
            ],
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
