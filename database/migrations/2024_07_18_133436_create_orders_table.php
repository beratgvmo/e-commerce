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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('store_id');
            $table->decimal('total_amount', 10, 2);
            $table->decimal('shipping_cost', 10, 2);
            $table->enum('status', ['Sipariş sürüyor', 'Sipariş bitti', 'İptal edildi', 'İade edildi'])->default('Sipariş sürüyor');
            $table->string('recipient_name', 50);
            $table->string('phone_number', 14);
            $table->string('city', 50);
            $table->string('address', 255);
            $table->string('order_code')->unique();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
