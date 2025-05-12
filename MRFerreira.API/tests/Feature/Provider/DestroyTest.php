<?php

namespace Tests\Feature\Provider;

use App\Models\{
    Address,
    Provider,
};
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class DestroyTest extends CustomTestCase
{
    private const ENDPOINT = '/api/providers';

    #[Test]
    public function returnStatusCode204WhenProviderIsDeleted(): void
    {
        $provider = Provider::factory()->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $provider->id);

        $response->assertNoContent();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->deleteJson(self::ENDPOINT . '/0');

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode404WhenProviderIsNotFound(): void
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
    public function checkIfTheProviderHasBeenDeletedFromTheDatabase(): void
    {
        $provider = Provider::factory()->create();

        $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $provider->id);

        $this->assertDatabaseMissing(
            'providers',
            [
                'id' => $provider->id,
            ]
        );
    }

    #[Test]
    public function checkIfTheProviderAddressIsDeletedFromTheDatabase(): void
    {
        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();

        $provider->load('addresses');

        $address = $provider
            ->addresses
            ->first();

        $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $provider->id);

        $this->assertDatabaseMissing(
            'addresses',
            [
                'zipcode' => $address->zipcode,
                'street' => $address->street,
                'neighborhood' => $address->neighborhood,
                'number' => $address->number,
                'state' => $address->state,
                'city' => $address->city,
            ]
        );
    }
}
