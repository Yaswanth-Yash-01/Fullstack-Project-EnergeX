<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;

class PostTest extends TestCase
{
    use DatabaseMigrations;

    private function getAuthToken()
    {
        $this->post('/api/register', [
            'name' => 'Alice',
            'email' => 'alice@example.com',
            'password' => 'password123'
        ]);

        $response = $this->post('/api/login', [
            'email' => 'alice@example.com',
            'password' => 'password123'
        ]);

        return json_decode($response->response->getContent())->token;
    }

    public function testCreatePost()
    {
        $token = $this->getAuthToken();

        $response = $this->post('/api/posts', [
            'title' => 'Test Post',
            'content' => 'This is a test post'
        ], ['Authorization' => "Bearer $token"]);

        $response->seeStatusCode(201)
            ->seeJsonStructure(['id', 'title', 'content', 'user_id']);
    }

    public function testGetPosts()
    {
        $token = $this->getAuthToken();

        // Create a post
        $this->post('/api/posts', [
            'title' => 'Another Post',
            'content' => 'Content here'
        ], ['Authorization' => "Bearer $token"]);

        $response = $this->get('/api/posts', ['Authorization' => "Bearer $token"]);
        $response->seeStatusCode(200)
            ->seeJsonStructure([['id', 'title', 'content', 'user_id']]);
    }
}
