<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;
class AuthTest extends TestCase
{
    use DatabaseMigrations;

    public function testUserCanRegister()
    {
        $response = $this->post('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123'
        ]);

        $response->seeStatusCode(201)
            ->seeJsonStructure(['id', 'name', 'email']);
    }

    public function testUserCanLogin()
    {
        // First, create a user
        $this->post('/api/register', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => 'password123'
        ]);

        $response = $this->post('/api/login', [
            'email' => 'jane@example.com',
            'password' => 'password123'
        ]);

        $response->seeStatusCode(200)
            ->seeJsonStructure(['token']);
    }
}
