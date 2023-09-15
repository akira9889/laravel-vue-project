<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginResponseTest extends TestCase
{
    use RefreshDatabase;

    public function test_json_response_after_login(): void
    {
        User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password',
        ];

        $response = $this->json('POST', '/login', $credentials);

        $response->assertStatus(200);

        $responseData = $response->json();

        // 必要なキーと値の検証
        $this->assertArrayHasKey('id', $responseData);
        $this->assertArrayHasKey('name', $responseData);
        $this->assertEquals('test@example.com', $responseData['email']);

        // 不必要なレスポンスがないかの検証
        $expectedKeys = ['id', 'name', 'email'];
        $actualKeys = array_keys($responseData);
        sort($expectedKeys);
        sort($actualKeys);
        $this->assertEquals($expectedKeys, $actualKeys);
    }

    public function test_redirect_after_login(): void
    {
        User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password',
        ];

        $response = $this->post('/login', $credentials);

        $response->assertRedirect('/');
    }
}
