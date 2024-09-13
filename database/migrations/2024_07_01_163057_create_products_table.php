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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedBigInteger('category_id');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->integer('kdv')->default(0);
            $table->decimal('discounted_price', 8, 2);
            $table->integer('stock_quantity');
            $table->integer('sales_count')->default(0);
            $table->decimal('rating', 3, 1)->default(0);
            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('store_id');
            $table->boolean('is_confirmation')->default(false);
            $table->text("red_message")->nullable();
            $table->enum('status', ['onay bekliyor', 'onaylandi', 'reddedildi'])->default('onay bekliyor');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
