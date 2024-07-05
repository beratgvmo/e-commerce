<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Store extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name_surname',
        'store_name',
        'email',
        'phone_number',
        'city',
        'selling_category_id',
        'img',
        'color',
        'slug',
        'password',
        'store_rating',
        'product_count',
        'followers_count',
        'reviews_count',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
