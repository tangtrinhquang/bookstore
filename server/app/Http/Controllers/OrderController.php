<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Hidehalo\Nanoid\Client;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $client;

    /**
     * Create a new BookController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->client = new Client();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->except(['height', 'length', 'width']);

        $validator = Validator::make($data, [
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'shipFee' => 'required',
            'productFee' => 'required',
            'service_type_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->resValidator([
                400, $validator->errors(),
            ]);
        }

        $order = Order::create(
            array_merge([
                'order_id' => $this->client->generateId($size = 7, $mode = Client::MODE_DYNAMIC),
            ], $data)
        );

        return $this->resSuccess($order, [
            201, 'Order created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
