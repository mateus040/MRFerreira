<?php

namespace App\Http\Requests\Provider;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
                'max:128',
            ],
            'cnpj' =>[
                'nullable',
                'string',
                'regex:/^[0-9]{14}$/',
                Rule::unique('providers', 'cnpj')->ignore($this->provider),
            ],
            'email' => [
                'required',
                'string',
                'email',
            ],
            'phone' => [
                'nullable',
                'string',
                'max:15',
            ],
            'cellphone' => [
                'nullable',
                'string',
                'max:15',
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
                'regex:/^[0-9]{8}$/',
            ],
            'address.street' => [
                'required',
                'string',
                'max:256',
            ],
            'address.number' => [
                'required',
                'integer',
                'regex:/^[1-9]{1,4}$/',
            ],
            'address.neighborhood' => [
                'required',
                'string',
                'max:256',
            ],
            'address.state' => [
                'required',
                'string',
                'max:32',
            ],
            'address.city' => [
                'required',
                'string',
                'max:256',
            ],
            'address.complement' => [
                'nullable',
                'string',
            ],
        ];
    }
}
