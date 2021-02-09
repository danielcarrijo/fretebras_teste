<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Config;
use Tymon\JWTAuth\Facades\JWTAuth;

class PaymentTest extends TestCase
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
        $response = $this->getJson('/api/payment?token=' . $token);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                "data",
                "value",
                "links",
                "meta"
            ]);
    }

    public function test_unauthorized_request()
    {
        $response = $this->getJson('/api/payment');
        $response
            ->assertStatus(401);
    }

    public function test_incorrect_invoice_id() {
        $invoice_id = 0;
        $user = User::where('email', Config::get('api.apiEmail'))->first();
        $token = JWTAuth::fromUser($user);
        $response = $this->getJson('/api/payment?token=' . $token . '&invoice=' . $invoice_id);
        $response
            ->assertStatus(422)
            ->assertJson([
                "invoice" => [
                    "O campo invoice não existe correspondência na tabela payments"
                ]
            ]);
    }

    public function test_correct_invoice_id() {
        $invoice_id = 0;
        $user = User::where('email', Config::get('api.apiEmail'))->first();
        $token = JWTAuth::fromUser($user);
        $invoice = Invoice::first();
        $invoice_id = $invoice ? $invoice->id : 0; 
        $response = $this->getJson('/api/payment?token=' . $token . '&invoice=' . $invoice_id);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                "data",
                "value",
                "links",
                "meta"
            ]);
    }

}
