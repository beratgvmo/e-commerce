<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Store extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'store_name',
        'email',
        'slug',
        'phone_number',
        'iban_no',
        'city',
        'address',
        'cargo_company',
        'logo',
        'banner',
        'selling_category_id',
        'cargo_companies_id',
        'store_rating',
        'followers_count',
        'reviews_count',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function product()
    {
        return $this->hasMany(Product::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function subBanners()
    {
        return $this->hasMany(StoreBanner::class);
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'store_followers', 'store_id', 'user_id');
    }

    public function getTotalFollowers()
    {
        return $this->followers()->count();
    }

    public function updateFollowersCount()
    {
        $this->followers_count = $this->followers()->count();
        $this->save();
    }
}
