<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductsStoreRequest extends FormRequest
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
            'descricao' => 'required|string',
            'comprimento' => 'nullable|string',
            'altura' => 'nullable|string',
            'profundidade' => 'nullable|string',
            'peso' => 'nullable|string',
            'linha' => 'nullable|string',
            'materiais' => 'nullable|string',
            'foto' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'id_provider' => 'required|exists:providers,id',
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
