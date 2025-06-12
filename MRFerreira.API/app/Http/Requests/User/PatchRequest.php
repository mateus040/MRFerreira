<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class PatchRequest extends FormRequest
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
                'sometimes',
                'string',
            ],
            'email' => [
                'sometimes',
                'string',
                'email',
                'unique:users,email',
            ],
        ];
    }
}
