<?php

namespace Tests\Feature\Product;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class DestroyTest extends CustomTestCase
{
    private const ENDPOINT = '/api/users';

    #[Test]
    public function returnStatusCode204WhenUserIsDeleted(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $user->id);

        $response->assertNoContent();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->deleteJson(self::ENDPOINT . '/0');

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode404WhenUserIsNotFound(): void
    {
        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/0');

        $response
            ->assertNotFound();
        // ->assertJson(
        //     [
        //         'message' => __('exceptions.not_found')
        //     ]
        // );
    }

    #[Test]
    public function checkIfTheUserHasBeenDeletedFromTheDatabase(): void
    {
        $user = User::factory()->create();

        $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $user->id);

        $this->assertDatabaseMissing(
            'users',
            [
                'id' => $user->id,
            ]
        );
    }
}
