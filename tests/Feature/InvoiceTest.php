<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Config;
use Tymon\JWTAuth\Facades\JWTAuth;

class InvoiceTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_successful_request()
    {
        $user = User::where('email', Config::get('api.apiEmail'))->first();
        $token = JWTAuth::fromUser($user);
        $response = $this->getJson('/api/invoice?token=' . $token);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                "data",
                "current_page",
                "to",
                "total",
                "last_page",
                "next_page_url"
            ]);
    }

    public function test_unauthorized_request()
    {
        $response = $this->getJson('/api/invoice');
        $response
            ->assertStatus(401);
    }

}
