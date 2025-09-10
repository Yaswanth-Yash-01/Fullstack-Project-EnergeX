<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/api/register', 'AuthController@register');
$router->post('/api/login', 'AuthController@login');


$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('api/posts', 'PostController@index');       // list all posts
    $router->get('api/posts/{id}', 'PostController@show');   // get single post
    $router->post('api/posts', 'PostController@store');      // create post
});

// Admin-only routes
$router->group(['middleware' => ['auth', 'role:admin']], function () use ($router) {
    $router->put('api/posts/{id}', 'PostController@update'); // edit any post
    $router->delete('api/posts/{id}', 'PostController@destroy'); // delete any post
});

