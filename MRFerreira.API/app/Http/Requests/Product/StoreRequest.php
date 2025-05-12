<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

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
                'max:256',
            ],
            'description' => [
                'required',
                'string',
            ],
            'length' => [
                'nullable',
                'string',
                'max:256',
            ],
            'height' => [
                'nullable',
                'string',
                'max:256',
            ],
            'depth' => [
                'nullable',
                'string',
                'max:256',                
            ],
            'weight' => [
                'nullable',
                'string',
                'max:256',
            ],
            'line' => [
                'nullable',
                'string',
                'max:256',
            ],
            'materials' => [
                'nullable',
                'string',
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
            'id_category' => [
                'required',
                'exists:categories,id',
            ],
        ];
    }
}
