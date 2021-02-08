<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function messages()
    {
        return [
            'integer' => 'O campo :attribute deve ser passado como um número inteiro.',
            'invoice.exists' => 'O campo :attribute não existe correspondência na tabela payments'
        ];
    }


    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'time' => 'integer',
            'invoice' => 'integer|exists:invoices,id',
            'store' => 'string'
        ];
    }
}
