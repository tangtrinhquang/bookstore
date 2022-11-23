<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->string('order_id')->primary();

            $table->string('name');
            $table->string('phone');
            $table->string('address');

            $table->double('productFee');

            $table->integer('height');
            $table->integer('length');
            $table->integer('width');

            $table->timestamp('createdAt')->useCurrent();
            $table->timestamp('updatedAt')->useCurrent();
        });
        DB::statement('ALTER TABLE `orders` ADD `shipFee` FLOAT NOT NULL AFTER `productFee`');
        DB::statement('ALTER TABLE `orders` ADD `service_type_id` FLOAT NOT NULL AFTER `order_id`');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
