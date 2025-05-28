<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use \Illuminate\Routing\Controller as RoutingController;

abstract class Controller extends RoutingController
{
    use AuthorizesRequests;

    // use \Illuminate\Routing\Controller as RoutingController;
    // This makes sure that the middleware() function is being used and that
    // the $this->authorizeResource() can be called successfully.
}
