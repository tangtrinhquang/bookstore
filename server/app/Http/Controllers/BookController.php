<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Hidehalo\Nanoid\Client;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;


class BookController extends Controller
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
        $book = Book::all();
        return $this->resSuccess($book, [
            200, 'Book List'
        ]);
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

        $validator = Validator::make($data, [
            'author_id' => 'required',
            'genre_id' => 'required',
            'publisher_id' => 'required',

            'name' => 'required',
            'countInStock' => 'required|numeric',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'page' => 'required|integer',
            'description' => 'required',

            'height' => 'required|numeric',
            'length' => 'required|numeric',
            'width' => 'required|numeric',
            'weight' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return $this->resValidator([
                400, $validator->errors(),
            ]);
        }

        $fileName = Auth::user()->user_id . '_' . $this->client->generateId($size = 8, $mode = Client::MODE_DYNAMIC) . '.' . $request->file('image')->extension();

        if (File::exists(storage_path('app/public/images_book/' . $fileName))) {
            return $this->resError([
                404, 'Upload image failed'
            ]);
        } else {
            $path = $request->file('image')->storeAs('public/images_book', $fileName);
            $image_url = substr($path, strlen('public/'));

            $book = Book::create(
                array_merge($data, [
                    'book_id' => $this->client->generateId($size = 7, $mode = Client::MODE_DYNAMIC),
                    'image' => $image_url,
                ])
            );

            return $this->resSuccess($book, [
                201, 'Book created successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $book = Book::findOrFail($id);

        return $this->resSuccess($book, [
            200, 'Book found successfully'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->except(['book_id']);
        $validator = Validator::make($data, [
            'author_id' => 'required',
            'genre_id' => 'required',
            'publisher_id' => 'required',
            'name' => 'required',

            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'page' => 'required|integer',
            'description' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->resValidator([
                400, $validator->errors(),
            ]);
        }

        $book = Book::findOrFail($id);
        $checkFile = storage_path('app/public/' . $book['image']);
        $oldImage = substr($book['image'], strlen('images_book/'));

        if (File::exists($checkFile)) {
            $path_1 = $data['image']->storeAs('public/images_book', $oldImage);

            $book->update(
                array_merge($data, ['image' => $book['image']])
            );
        } else {
            $newFileName = Auth::user()->user_id . '_' . $this->client->generateId($size = 8, $mode = Client::MODE_DYNAMIC) . '.' . $data['image']->extension();
            $path_2 = $data['image']->storeAs('public/images_book', $newFileName);
            $newImage = substr($path_2, strlen('public/'));
            $book->update(
                array_merge($data, ['image' => $newImage])
            );
        }

        return $this->resSuccess($book, [
            200, 'Book updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        unlink(storage_path('app/public/' . $book['image']));
        $book->delete();
        return $this->resSuccess($book, [
            200, 'Book deleted successfully',
        ]);
    }
}
