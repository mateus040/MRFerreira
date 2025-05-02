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
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'cnpj' =>[
                'nullable',
                'string',
                'regex:/^[0-9]{14}$/',
                'unique:providers.cnpj',
            ],
            'street' => [
                'required',
                'string',
                'max:255',
            ],
            'neighborhood' => [
                'required',
                'string',
                'max:255',
            ],
            'number' => [
                'required',
                'integer',
            ],
            'zipcode' => [
                'required',
                'string',
                'regex:/^[0-9]{8}',
            ],
            'city' => [
                'required',
                'string',
                'max:255',
            ],
            'state' => [
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
            'phone' => [
                'nullable',
                'string',
            ],
            'cellphone' => [
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
            'name.required' => 'Nome é obrigatório',
            'street.required' => 'Rua é obrigatório!',
            'neighborhood.required' => 'Bairro é obrigatório!',
            'number.required' => 'Número é obrigatório!',
            'zipcode.required' => 'CEP é obrigatório!',
            'city.required' => 'Cidade é obrigatório!',
            'state.required' => 'Estado é obrigatório!',
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
