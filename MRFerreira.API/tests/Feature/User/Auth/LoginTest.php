<?php

namespace Tests\Feature\User;

use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class LoginTest extends CustomTestCase
{
    private const ENDPOINT = '/api/login';

    #[Test]
    public function returnStatusCode200WhenLoggingIn(): void
    {
        $password = fake()->password();

        $user = User::factory()->create([
            'password' => $password,
        ]);

        $credentials = [
            'email' => $user->email,
            'password' => $password,
        ];

        $response = $this->postJson(self::ENDPOINT, $credentials);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'token',
                    'expires_in',
                ],
            ]);
    }

    #[Test]
    public function returnStatusCode401IfPasswordIsInvalidForExistingUser(): void
    {
        $password = fake()->password();

        $user = User::factory()->create();

        $credentials = [
            'email' => $user->email,
            'password' => $password,
        ];

        $response = $this->postJson(self::ENDPOINT, $credentials);

        $response
            ->assertUnauthorized()
            ->assertJson(['message' => __('auth.failed')]);
    }

    #[Test]
    public function returnStatusCode401IfEmailIsInvalidForExistingUser(): void
    {
        $password = fake()->password();

        $user = User::factory()->create([
            'password' => $password,
        ]);

        $credentials = [
            'email' => fake()->email(),
            'password' => $password,
        ];

        $response = $this->postJson(self::ENDPOINT, $credentials);

        $response
            ->assertUnauthorized()
            ->assertJson(['message' => __('auth.failed')]);
    }

    #[Test]
    public function returnStatusCode422WhenFieldsHaveAnError(): void
    {
        $fieldWithErrors = [
            'email',
            'password',
        ];

        $response = $this->postJson(self::ENDPOINT, []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors($fieldWithErrors);
    }
}
