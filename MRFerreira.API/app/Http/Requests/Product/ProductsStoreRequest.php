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
            'nome' => [
                'required',
                'string',
                'max:255',
            ],
            'descricao' => [
                'required',
                'string',
            ],
            'comprimento' => [
                'nullable',
                'string',
                'max:255',
            ],
            'altura' => [
                'nullable',
                'string',
                'max:255',
            ],
            'profundidade' => [
                'nullable',
                'string',
                'max:255',                
            ],
            'peso' => [
                'nullable',
                'string',
                'max:255',
            ],
            'linha' => [
                'nullable',
                'string',
                'max:255',
            ],
            'materiais' => [
                'nullable',
                'string',
                'max:255',
            ],
            'foto' => [
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
            'nome.required' => 'Nome é obrigatório!',
            'descricao.required' => 'Descrição é obrigatório!',
            'foto.required' => 'Foto é obrigatório!',
            'foto.mimes' => 'Formato de imagem inválido, deve ser jpeg, png, jpg, gif ou svg',
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
