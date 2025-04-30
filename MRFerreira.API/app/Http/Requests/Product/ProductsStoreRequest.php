<?php

namespace App\Http\Requests\Product;

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
            'description' => [
                'required',
                'string',
            ],
            'length' => [
                'nullable',
                'string',
                'max:255',
            ],
            'height' => [
                'nullable',
                'string',
                'max:255',
            ],
            'depth' => [
                'nullable',
                'string',
                'max:255',                
            ],
            'weight' => [
                'nullable',
                'string',
                'max:255',
            ],
            'line' => [
                'nullable',
                'string',
                'max:255',
            ],
            'materials' => [
                'nullable',
                'string',
                'max:255',
            ],
            'photo' => [
                'sometimes',
                'image',
                'mimes:jpeg,png,jpg,gif,svg,webp',
                'max:2048',
            ],
            'id_provider' => [
                'required',
                'exists:providers,id',
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nome é obrigatório!',
            'description.required' => 'Descrição é obrigatório!',
            'photo.required' => 'Foto é obrigatório!',
            'photo.mimes' => 'Formato de imagem inválido, deve ser jpeg, png, jpg, gif ou svg',
            'id_provider.required' => 'O fornecedor selecionado não existe!'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => $validator->errors()
        ], 422));
    }
}
