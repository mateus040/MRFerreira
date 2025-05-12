<?php

namespace Tests\Feature\User;

use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;
use Illuminate\Support\Str;

class LogoutTest extends CustomTestCase
{
    private const ENDPOINT = '/api/logout';

    #[Test]
    public function returnStatusCode204WhenLogoutIsSuccessful(): void
    {
        $user = User::factory()->create();

        $token = $user
            ->createToken('token-name')
            ->plainTextToken;

        $header = ['Authorization' => 'Bearer ' . $token];

        $response = $this
            ->withHeaders($header)
            ->postJson(self::ENDPOINT);

        $response->assertNoContent();
    }

    #[Test]
    public function return401WhenLoggingOutWithoutBeingLoggedIn(): void
    {
        $response = $this->postJson(self::ENDPOINT);

        $response->assertUnauthorized();
    }

    #[Test]
    public function checkIfTheAccessTokenWasRemovedFromTheDatabase(): void
    {
        $user = User::factory()->create();

        $nameToken = 'token-name';

        $plainTextToken = $user
            ->createToken($nameToken)
            ->plainTextToken;

        $token = Str::after($plainTextToken, '|');

        $hashedToken = hash('sha256', $token);

        $this->assertDatabaseHas(
            'personal_access_tokens',
            [
                'tokenable_id' => $user->id,
                'tokenable_type' => User::class,
                'name' => $nameToken,
                'token' => $hashedToken,
            ],
        );

        $header = ['Authorization' => 'Bearer ' . $plainTextToken];

        $this
            ->withHeaders($header)
            ->postJson(self::ENDPOINT);

        $this->assertDatabaseMissing(
            'personal_access_tokens',
            [
                'tokenable_id' => $user->id,
                'tokenable_type' => User::class,
                'name' => $nameToken,
                'token' => $hashedToken,
            ],
        );
    }
}
