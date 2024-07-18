<?php

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
            'first_name' => 'required|string|min:3|max:30',
            'last_name' => 'required|string|min:3|max:30',
            'store_name' => 'required|string|min:5|max:50|unique:stores',
            'email' => 'required|string|email|max:255|unique:stores',
            'slug' => 'required|string|unique:stores',
            'phone_number' => 'required|string|size:14',
            'iban_no' => 'required|string|size:32',
            'city' => 'required|string|max:50',
            'address' => 'required|string|min:30|max:255',
            'cargo_company' => 'required|in:ptt kargo,yurtici kargo,aras kargo,sürat kargo',
            // 'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048|dimensions:min_width=400,min_height=400',
            // 'banner' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048|dimensions:min_width=1200,min_height=300',
            'selling_category_id' => 'required|exists:categories,id',
            'cargo_companies_id' => 'required|exists:CargoCompany,id',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'İsim zorunludur.',
            'first_name.string' => 'İsim yalnızca harf içerebilir.',
            'first_name.min' => 'İsim en az 2 harf olmalıdır.',
            'first_name.max' => 'İsim en fazla 30 karakter olabilir.',
            'last_name.required' => 'Soyisim zorunludur.',
            'last_name.string' => 'Soyisim yalnızca harf içerebilir.',
            'last_name.min' => 'Soyisim en az 2 harf olmalıdır.',
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
            'phone_number.size' => 'Telefon numarası 15 haneli olmalıdır.',
            'iban_no.required' => 'IBAN numarası zorunludur.',
            'iban_no.string' => 'Geçerli bir IBAN numarası giriniz.',
            'iban_no.size' => 'IBAN numarası 34 haneli olmalıdır.',
            'city.required' => 'Şehir bilgisi zorunludur.',
            'city.string' => 'Şehir bilgisi yalnızca harf içerebilir.',
            'city.max' => 'Şehir bilgisi en fazla 50 karakter olabilir.',
            'address.required' => 'Adres bilgisi zorunludur.',
            'address.string' => 'Adres bilgisi yalnızca harf içerebilir.',
            'address.max' => 'Adres bilgisi en fazla 255 karakter olabilir.',
            'cargo_company.required' => 'Kargo şirketi seçimi zorunludur.',
            'cargo_company.in' => 'Geçerli bir kargo şirketi seçiniz.',
            'img.image' => 'Yüklenen dosya bir resim olmalıdır.',
            'img.mimes' => 'Yüklenen resim JPG, JPEG, PNG veya WEBP formatında olmalıdır.',
            'img.max' => 'Yüklenen resim en fazla 2MB boyutunda olabilir.',
            'img.dimensions' => 'Resmin en az 400x400 piksel boyutunda olması gerekmektedir.',
            'banner.image' => 'Yüklenen dosya bir resim olmalıdır.',
            'banner.mimes' => 'Yüklenen resim JPG, JPEG, PNG veya WEBP formatında olmalıdır.',
            'banner.max' => 'Yüklenen resim en fazla 2MB boyutunda olabilir.',
            'banner.dimensions' => 'Banner resminin en az 1200x300 piksel boyutunda olması gerekmektedir.',
            'selling_category_id.required' => 'Satış kategorisi seçimi zorunludur.',
            'selling_category_id.exists' => 'Seçilen satış kategorisi geçerli değil.',
            'cargo_companies_id.required' => 'Kargo Firması seçimi zorunludur.',
            'password.required' => 'Şifre zorunludur.',
            'password.confirmed' => 'Şifreler eşleşmiyor.',
        ];
    }
}
