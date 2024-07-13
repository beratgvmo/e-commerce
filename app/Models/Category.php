<?php

// app/Models/Category.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id', 'slug'];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function attributeType()
    {
        return $this->hasMany(AttributeType::class);
    }

    public function childrenRecursive()
    {
        return $this->hasMany(Category::class, 'parent_id')->with('childrenRecursive');
    }
}
