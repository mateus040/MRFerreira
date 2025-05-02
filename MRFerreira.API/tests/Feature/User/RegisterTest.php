<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class RegisterTest extends CustomTestCase
{
    private const ENDPOINT = '/api/register';

    #[Test]
    public function returnStatusCode201WhenCreatingAUser(): void
    {
        $user = User::factory()->make();

        $response = $this->postJson(self::ENDPOINT, $user->getAttributes());

        $response->assertCreated();
    }

    #[Test]
    public function returnStatusCode422WhenFieldsHaveAnError(): void
    {
        $fieldWithErrors = [
            'name',
            'email',
            'password',
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors($fieldWithErrors);
    }

    #[Test]
    public function checkIfTheUserIsSavedInTheDatabase(): void
    {
        $user = User::factory()->make();

        $this->postJson(self::ENDPOINT, $user->getAttributes());

        $this->assertDatabaseHas(
            'users',
            [
                'name' => $user->name,
                'email' => $user->email,
            ],
        );
    }

    #[Test]
    public function checkUserPasswordWasEncryptedWhenRecordWasCreated(): void
    {
        $password = fake()->password();

        $user = User::factory()->make([
            'password' => $password,
        ]);

        $body = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => $password,
        ];

        $this->postJson(self::ENDPOINT, $body);

        $createdUser = User::where('name', $body['name'])->first();

        $this->assertNotEquals($body['password'], $createdUser->password);
        $this->assertTrue(Hash::check($body['password'], $createdUser->password));
    }
}
