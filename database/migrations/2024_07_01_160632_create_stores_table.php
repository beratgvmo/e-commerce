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
            $table->string('name_surname');
            $table->string('store_name', 25)->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('phone_number', 11);
            $table->string('city', 50);
            $table->string('img');
            $table->string('color');
            $table->unsignedBigInteger('selling_category_id');
            $table->float('store_rating')->default(0);
            $table->integer('product_count')->default(0);
            $table->integer('followers_count')->default(0);
            $table->integer('reviews_count')->default(0);
            $table->string('password');
            $table->rememberToken();
            $table->foreign('selling_category_id')->references('id')->on('categories');
            $table->timestamps();
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
