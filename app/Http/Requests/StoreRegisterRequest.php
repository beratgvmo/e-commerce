<?php
// app/Http/Requests/StoreRegisterRequest.php

namespace App\Http\Requests;

use App\Rules\TwoWordMinLengthMaxRule;
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
            'name_surname' => ['required', 'string', new TwoWordMinLengthMaxRule(2, 30)],
            'store_name' => 'required|string|min:5|max:20|unique:stores',
            'email' => 'required|string|email|max:255|unique:stores',
            'phone_number' => 'required|string|size:14',
            'city' => 'required|string|max:50',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'selling_category_id' => 'required|exists:categories,id',
            'img' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048|dimensions:min_width=400,min_height=400',
            'color' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'name_surname.required' => 'Ad ve soyad alanı zorunludur.',
            'name_surname.string' => 'Ad ve soyad yalnızca harf içerebilir.',
            'name_surname.min' => 'Ad ve soyad en az 2 harften oluşmalı ve en az iki kelime olmalıdır.',
            'name_surname.max' => 'Ad ve soyad en fazla 30 karakter olabilir.',
            'store_name.required' => 'Mağaza adı zorunludur.',
            'store_name.string' => 'Mağaza adı yalnızca harf içerebilir.',
            'store_name.min' => 'Mağaza adı en az 5 harf olmalıdır.',
            'store_name.max' => 'Mağaza adı en fazla 20 karakter olabilir.',
            'store_name.unique' => 'Bu mağaza adı zaten kullanılıyor.',
            'email.required' => 'E-posta adresi zorunludur.',
            'email.string' => 'Geçerli bir e-posta adresi giriniz.',
            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'email.max' => 'E-posta adresi en fazla 255 karakter olabilir.',
            'email.unique' => 'Bu e-posta adresi zaten kullanılıyor.',
            'phone_number.required' => 'Telefon numarası zorunludur.',
            'phone_number.string' => 'Geçerli bir telefon numarası giriniz.',
            'phone_number.size' => 'Telefon numarası 14 haneli olmalıdır.',
            'city.required' => 'Şehir bilgisi zorunludur.',
            'city.string' => 'Şehir bilgisi yalnızca harf içerebilir.',
            'city.max' => 'Şehir bilgisi en fazla 50 karakter olabilir.',
            'password.required' => 'Şifre zorunludur.',
            'password.confirmed' => 'Şifreler eşleşmiyor.',
            'password.min' => 'Şifre en az :min karakter olmalıdır.',
            'password.default' => 'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.',
            'selling_category_id.required' => 'Satış kategorisi seçimi zorunludur.',
            'selling_category_id.exists' => 'Seçilen satış kategorisi geçerli değil.',
            'img.required' => 'Resim yüklemek zorunludur.',
            'img.image' => 'Yüklenen dosya bir resim olmalıdır.',
            'img.mimes' => 'Yüklenen resim JPG, JPEG veya PNG formatında olmalıdır.',
            'img.max' => 'Yüklenen resim en fazla 2MB boyutunda olabilir.',
            'img.dimensions' => 'Resmin en az 400x400 piksel boyutunda olması gerekmektedir.',
            'color.required' => 'Renk bilgisi zorunludur.',
            'color.string' => 'Renk bilgisi yalnızca harf içerebilir.',
        ];
    }
}
