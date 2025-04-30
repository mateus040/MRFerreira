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
            'address.zipcode' => [
                'required',
                'string',
                'regex:/^[0-9]{8}',
            ],
            'address.street' => [
                'required',
                'string',
                'max:255',
            ],
            'address.number' => [
                'required',
                'integer',
            ],
            'address.neighborhood' => [
                'required',
                'string',
                'max:255',
            ],
            'address.state' => [
                'required',
                'string',
                'max:2',
            ],
            'address.city' => [
                'required',
                'string',
                'max:255',
            ],
            'address.complement' => [
                'nullable',
                'string',
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nome é obrigatório',
            'email.required' => 'Email é obrigatório!',
            'logo.required' => 'Logo é obrigatório!',
            'logo.mimes' => 'Formato de imagem inválido, deve ser jpeg, png, jpg, gif ou svg',
            'address.zipcode.required' => 'CEP é obrigatório!',
            'address.street.required' => 'Rua é obrigatório!',
            'address.number.required' => 'Número é obrigatório!',
            'address.neighborhood.required' => 'Bairro é obrigatório!',
            'address.state.required' => 'Estado é obrigatório!',
            'address,city.required' => 'Cidade é obrigatório!',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => $validator->errors()
        ], 422));
    }
}
