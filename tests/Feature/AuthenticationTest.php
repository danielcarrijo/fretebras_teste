<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Config;
class AuthenticationTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_successful_login()
    {
        $response = $this->postJson('/api/login', [
            'email' => Config::get('api.apiEmail'),
            'password' => Config::get('api.apiPassword')
        ]);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                "expires_in",
                "access_token",
                "token_type"
            ]);
    }

    public function test_bad_login()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'usuario.tsdsdeste@teste.com',
            'password' => '12345sdsd678'
        ]);

        $response
            ->assertStatus(401)
            ->assertJson([
                "error" => "Unauthorized"
            ]);
    }
}
