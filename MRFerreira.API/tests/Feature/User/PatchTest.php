<?php

namespace Tests\Feature\Product;

use App\Models\{
    Product,
    User,
};
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class PatchTest extends CustomTestCase
{
    private const ENDPOINT = '/api/users';

    #[Test]
    public function returnStatusCode204WhenUserIsUpdated(): void
    {
        $user = User::factory()->create();

        $body = [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->patchJson(self::ENDPOINT . '/' . $user->id, $body);

        $response->assertNoContent();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->patchJson(self::ENDPOINT . '/0');

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode404IfUserNotFound(): void
    {
        Product::factory()->create();

        $body = [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->patchJson(self::ENDPOINT . '/0', $body);

        $response
            ->assertNotFound();
        // ->assertJson(
        //     [
        //         'message' => __('exceptions.not_found')
        //     ]
        // );
    }

    #[Test]
    public function checkIfTheUserHasBeenUpdatedInTheDatabase(): void
    {
        $user = User::factory()->create();

        $body = [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
        ];

        $this
            ->withoutMiddleware(Authenticate::class)
            ->patchJson(self::ENDPOINT . '/' . $user->id, $body);

        $this->assertDatabaseHas(
            'users',
            [
                'name' => $body['name'],
                'email' => $body['email'],
            ]
        );
    }

    #[Test]
    public function checkIfItIsPossibleToUpdateOnlyOneUserField(): void
    {
        $user = User::factory()->create();

        $body = [
            'name' => fake()->name(),
        ];

        $this
            ->withoutMiddleware(Authenticate::class)
            ->patchJson(self::ENDPOINT . '/' . $user->id, $body);

        $this->assertDatabaseHas(
            'users',
            [
                'name' => $body['name'],
                'email' => $user->email,
            ]
        );
    }
}
