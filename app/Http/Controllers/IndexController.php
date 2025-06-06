<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    public function index() {
        // dd(Auth::user());
        return inertia(
            'Index/Index',
            [
                'message' => 'Hello from Laravel 12',
                'number' => 123
            ]
        );
    }

    public function show() {
        return inertia(
            'Index/Show',
            [
                'message' => 'Hello from show page'
            ]
        );
    }
}
