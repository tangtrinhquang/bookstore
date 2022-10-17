<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Hidehalo\Nanoid\Client;
use Illuminate\Support\Facades\File;

class AuthorController extends Controller
{
    protected $client;

    /**
     * Create a new UserController instance.
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
        $data = $request->all();
        $request->file('portrait')->store('author', 'local');
        $validator = Validator::make($data, [
            'name' => 'required|max:255',
            'portrait' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => [
                    'status' => 400,
                    'fields' => $validator->errors(),
                    'message' => 'Something is wrong with this field',
                ]
            ], 400);
        }

        $fileName = Auth::user()->user_id . '_' . $this->client->generateId($size = 8, $mode = Client::MODE_DYNAMIC) . '.' . $request->file('portrait')->extension();

        if (File::exists(storage_path('app/public/portrait/' . $fileName))) {
            return response()->json([
                'success' => false,
                'error' => [
                    'status' => 304,
                    'message' => 'Upload image failed',
                ]
            ], 404);
        } else {
            $path = $request->file('portrait')->storeAs('public/portrait', $fileName);
            $image_url = substr($path, strlen('public/'));

            $author = Author::create([
                'author_id' => $this->client->generateId($size = 7, $mode = Client::MODE_DYNAMIC),
                'name' => $request->name,
                'portrait' => $image_url,
                'description' => $request->description,
            ]);

            return response()->json([
                'success' => true,
                'status' => 201,
                'message' => 'Author created successfully',
                'data' => $author,
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function show(Author $author)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function edit(Author $author)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Author $author)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function destroy(Author $author)
    {
        //
    }
}
