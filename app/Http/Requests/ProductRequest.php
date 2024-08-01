<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'name' => 'required|string|min:15',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string|min:40',
            'price' => 'required|min:2',
            'stock_quantity' => 'required|min:2',
            'is_active' => 'required|boolean',
            'images' => ['required', 'array', 'min:2'],
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'productAttribute' => ['required', 'array', 'min:5'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Ürün adı gereklidir.',
            'name.min' => 'Ürün adı en az 15 karakter olmalıdır.',
            'category_id.required' => 'Kategori gereklidir.',
            'category_id.exists' => 'Geçerli bir kategori seçmelisiniz.',
            'description.required' => 'Ürün açıklaması gereklidir.',
            'description.min' => 'Ürün açıklaması en az 40 karakter olmalıdır.',
            'price.required' => 'Ürün fiyatı gereklidir.',
            'price.min' => 'Ürün fiyatı en az :min birim olmalıdır.',
            'stock_quantity.required' => 'Stok miktarı gereklidir.',
            'stock_quantity.min' => 'Stok miktarı en az :min birim olmalıdır.',
            'is_active.required' => 'Ürün durumu gereklidir.',
            'is_active.boolean' => 'Ürün durumu doğru veya yanlış olmalıdır.',
            'images.required' => 'Resimler yüklenmelidir.',
            'images.array' => 'Resimler bir dizi olmalıdır.',
            'images.min' => 'En az iki resim yüklemeniz gerekmektedir.',
            'images.*.image' => 'Geçerli bir resim dosyası yükleyiniz.',
            'images.*.mimes' => 'Resim dosyası jpeg, png, jpg veya webp formatında olmalıdır.',
            'images.*.max' => 'Resim dosyası boyutu en fazla :max KB olmalıdır.',
        ];
    }
}
