<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Hidehalo\Nanoid\Client;

class AuthenticationController extends Controller
{
    protected $client;

    /**
     * Create a new AuthenticationController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->client = new Client();
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'success' => true,
            'message' => 'Token generated successfully',
            'data' => [
                'token_type' => 'bearer',
                'access_token' => $token,
                'expires_in' => Auth::factory()->getTTL() * 60,
            ]
        ]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:255',
            'password' => 'required|max:255',
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

        if (!$token = Auth::attempt($validator->validated())) {
            return response()->json(['error' => 'Email or Password is invalid'], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|max:255|unique:users',
            'password' => 'required|max:255',
            'address' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => [
                    'status' =>  400,
                    'fields' => $validator->errors(),
                    'message' => 'Something is wrong with this field',
                ],
            ], 400);
        }

        $user = User::create([
            'user_id' => $this->client->generateId($size = 7, $mode = Client::MODE_DYNAMIC),
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($plain_text = $request->password),
            'address' => $request->address,
            'role' => 0,
        ]);

        return response()->json([
            'success' => true,
            'status' => 201,
            'message' => 'User registered successfully',
            'data' => $user,
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'User signed out successfully']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refreshToken()
    {
        return $this->createNewToken(Auth::refresh());
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'oldPassword' => 'required',
            'newPassword' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user_id = Auth::user()->user_id;

        $user = User::where('user_id', $user_id)->update(
            ['password' => bcrypt($request->new_password)]
        );

        return response()->json([
            'success' => true,
            'message' => 'User changed password successfully',
            'user' => $user,
        ], 201);
    }

    public function userProfile()
    {
        return response()->json(Auth::user());
    }
}
