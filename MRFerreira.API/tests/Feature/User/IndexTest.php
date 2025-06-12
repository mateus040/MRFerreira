<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class IndexTest extends CustomTestCase
{
    private const ENDPOINT = '/api/users';

    #[Test]
    public function returnStatusCode200WhenRequestIsSuccessfully(): void
    {
        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'email',
                    ],
                ],
            ]);
    }

    #[Test]
    public function checkIfTheUserDataWasReturned(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $response->assertJson([
            'data' => [
                [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ],
        ]);
    }

    #[Test]
    public function checkThatTheCorrectNumberOfUserIsReturned(): void
    {
        $quantityUsers = 5;

        User::factory()
            ->count($quantityUsers)
            ->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $this->assertCount($quantityUsers, $response->json('data'));
    }

    #[Test]
    public function checkIfDeletedUsersAreNotReturned(): void
    {
        $user = User::factory()->create();
''
        $user->delete();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $response->assertJsonMissing(['id' => $user->id]);
    }
}
