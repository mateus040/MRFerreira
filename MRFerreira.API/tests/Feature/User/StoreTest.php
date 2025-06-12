<?php

namespace Tests\Feature\Product;

use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class StoreTest extends CustomTestCase
{
    private const ENDPOINT = '/api/users';

    #[Test]
    public function returnStatusCode201WhenUserIsCreatedWithFullData(): void
    {
        $user = User::factory()->make();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $user->getAttributes());

        $response
            ->assertCreated()
            ->assertJsonStructure([
                'data' => ['id'],
            ]);
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->postJson(self::ENDPOINT);

        $response->assertUnauthorized();
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

        $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $user->getAttributes());

        $this->assertDatabaseHas(
            'users',
            [
                'name' => $user->name,
                'email' => $user->email,
            ],
        );
    }
}
