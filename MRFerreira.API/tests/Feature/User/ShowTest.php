<?php

namespace Tests\Feature\Product;

use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class ShowTest extends CustomTestCase
{
    private const ENDPOINT = '/api/users';

    #[Test]
    public function returnStatusCode200WhenRequestIsSuccessfully(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT . '/' . $user->id);

        $response
            ->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ]);
    }

    #[Test]
    public function returnStatusCode404IfUserNotExists(): void
    {
        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT . '/0');

        $response
            ->assertNotFound()
            ->assertJson(
                [
                    'message' => __('exceptions.not_found'),
                ],
            );
    }
}
