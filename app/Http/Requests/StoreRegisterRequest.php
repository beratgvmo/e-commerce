<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreRegisterRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'first_name' => 'required|string|min:2|max:30',
            'last_name' => 'required|string|min:2|max:30',
            'store_name' => 'required|string|min:5|max:30|unique:stores',
            'email' => 'required|string|email|max:255|unique:stores',
            'phone_number' => 'required|string|size:14',
            'iban_no' => 'required|string|size:32',
            'city' => 'required|string|max:50',
            'address' => 'required|string|min:30|max:255',
            'selling_category_id' => 'required|exists:categories,id',
            'cargo_companies_id' => 'required|exists:cargo_companies,id',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'İsim zorunludur.',
            'first_name.string' => 'İsim yalnızca harf içerebilir.',
            'first_name.min' => 'İsim en az 3 harf olmalıdır.',
            'first_name.max' => 'İsim en fazla 30 karakter olabilir.',
            'last_name.required' => 'Soyisim zorunludur.',
            'last_name.string' => 'Soyisim yalnızca harf içerebilir.',
            'last_name.min' => 'Soyisim en az 3 harf olmalıdır.',
            'last_name.max' => 'Soyisim en fazla 30 karakter olabilir.',
            'store_name.required' => 'Mağaza adı zorunludur.',
            'store_name.string' => 'Mağaza adı yalnızca harf içerebilir.',
            'store_name.min' => 'Mağaza adı en az 5 harf olmalıdır.',
            'store_name.max' => 'Mağaza adı en fazla 50 karakter olabilir.',
            'store_name.unique' => 'Bu mağaza adı zaten kullanılıyor.',
            'email.required' => 'E-posta adresi zorunludur.',
            'email.string' => 'Geçerli bir e-posta adresi giriniz.',
            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'email.max' => 'E-posta adresi en fazla 255 karakter olabilir.',
            'email.unique' => 'Bu e-posta adresi zaten kullanılıyor.',
            'slug.required' => 'Slug zorunludur.',
            'slug.string' => 'Slug yalnızca harf içerebilir.',
            'slug.unique' => 'Bu slug zaten kullanılıyor.',
            'phone_number.required' => 'Telefon numarası zorunludur.',
            'phone_number.string' => 'Geçerli bir telefon numarası giriniz.',
            'phone_number.size' => 'Telefon numarası 14 haneli olmalıdır.',
            'iban_no.required' => 'IBAN numarası zorunludur.',
            'iban_no.string' => 'Geçerli bir IBAN numarası giriniz.',
            'iban_no.size' => 'IBAN numarası 32 haneli olmalıdır.',
            'city.required' => 'Şehir bilgisi zorunludur.',
            'city.string' => 'Şehir bilgisi yalnızca harf içerebilir.',
            'city.max' => 'Şehir bilgisi en fazla 50 karakter olabilir.',
            'address.required' => 'Adres bilgisi zorunludur.',
            'address.string' => 'Adres bilgisi yalnızca harf içerebilir.',
            'address.min' => 'Adres bilgisi en az 30 karakter olmalıdır.',
            'address.max' => 'Adres bilgisi en fazla 255 karakter olabilir.',
            'selling_category_id.required' => 'Satış kategorisi seçimi zorunludur.',
            'selling_category_id.exists' => 'Seçilen satış kategorisi geçerli değil.',
            'cargo_companies_id.required' => 'Kargo Firması seçimi zorunludur.',
            'cargo_companies_id.exists' => 'Seçilen kargo firması geçerli değil.',
            'password.required' => 'Şifre zorunludur.',
            'password.confirmed' => 'Şifreler eşleşmiyor.',
        ];
    }
}
