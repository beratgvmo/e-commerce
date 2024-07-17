<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name_surname', 30);
            $table->string('store_name', 20)->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('slug')->unique();
            $table->string('phone_number', 14);
            $table->string('city');
            $table->string('img')->nullable();
            $table->string('banner')->nullable();
            $table->unsignedBigInteger('selling_category_id');
            $table->float('store_rating')->default(0);
            $table->integer('product_count')->default(0);
            $table->integer('followers_count')->default(0);
            $table->integer('reviews_count')->default(0);
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('selling_category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
