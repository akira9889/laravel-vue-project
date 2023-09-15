<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AuthController extends Controller
{
    public function getAuthUser(Request $request): UserResource
    {
        return Cache::remember('user-' . $request->user()->id, 60, function () use ($request) {
            return new UserResource($request->user());
        });
    }
}
