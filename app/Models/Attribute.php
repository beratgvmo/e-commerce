<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'attribute_type_id'];

    public function attributeType()
    {
        return $this->belongsTo(AttributeType::class);
    }

    public function productAttributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_attributes');
    }
}
