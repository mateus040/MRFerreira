<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'name' => 'required|string',
            'description' => 'required|string',
            'length' => 'required|numeric',
            'height' => 'required|numeric',
            'depth' => 'required|numeric',
            'weight' => 'required|numeric',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'id_company' => 'required|exists:companys,id',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required!',
            'description.required' => 'Description is required!',
            'length.required' => 'Length is required!',
            'height.required' => 'Height is required!',
            'depth.required' => 'Depth is required!',
            'weight.required' => 'Weight is required!',
            'photo.required' => 'Photo is required!',
            'id_company.required' => 'The selected company does not exist.'
        ];
    }
}
