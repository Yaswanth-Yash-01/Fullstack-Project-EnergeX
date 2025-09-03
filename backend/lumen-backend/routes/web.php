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
$router->group(['middleware' => 'auth:api'], function () use ($router) {
    $router->get('/posts', 'PostController@index');
});

$router->post('/api/register', 'AuthController@register');
$router->post('/api/login', 'AuthController@login');
$router->get('/api/posts', ['middleware' => 'auth', 'uses' => 'PostController@index']);
$router->post('/api/posts', ['middleware' => 'auth', 'uses' => 'PostController@store']);
$router->get('/api/posts/{id}', ['middleware' => 'auth', 'uses' => 'PostController@show']);
