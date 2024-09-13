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
            $table->string('first_name', 30);
            $table->string('last_name', 30);
            $table->string('store_name', 50)->unique();
            $table->string('email')->unique();
            $table->string('slug')->unique();
            $table->string('phone_number', 14);
            $table->string('iban_no', 32);
            $table->string('city', 50);
            $table->string('address', 255);
            $table->string('logo')->nullable();
            $table->string('banner')->nullable();
            $table->unsignedBigInteger('selling_category_id');
            $table->unsignedBigInteger('cargo_companies_id');
            $table->decimal('rating', 3, 1)->default(0);
            $table->integer('followers_count')->default(0);
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('selling_category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('cargo_companies_id')->references('id')->on('cargo_companies');
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
