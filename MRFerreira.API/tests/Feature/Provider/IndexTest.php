<?php

namespace Tests\Feature\Provider;

use App\Models\{
    Address,
    Provider,
};
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class IndexTest extends CustomTestCase
{
    private const ENDPOINT = '/api/providers';

    #[Test]
    public function returnStatusCode200WhenRequestIsSuccessfully(): void
    {
        $response = $this->getJson(self::ENDPOINT);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'cnpj',
                        'email',
                        'phone',
                        'cellphone',
                        'logo',
                        'logo_url',
                        'address' => [
                            'zipcode',
                            'street',
                            'neighborhood',
                            'number',
                            'state',
                            'city',
                            'complement',
                        ],
                        'created_at',
                    ],
                ],
            ]);
    }

    #[Test]
    public function checkIfTheProviderDataWasReturned(): void
    {
        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();

        $provider->load('addresses');

        $address = $provider
            ->addresses
            ->first();

        $response = $this->getJson(self::ENDPOINT);

        $response->assertJson([
            'data' => [
                [
                    'id' => $provider->id,
                    'name' => $provider->name,
                    'cnpj' => $provider->cnpj,
                    'email' => $provider->email,
                    'address' => [
                        'zipcode' => $address->zipcode,
                        'street' => $address->street,
                        'neighborhood' => $address->neighborhood,
                        'number' => $address->number,
                        'state' => $address->state,
                        'city' => $address->city,
                    ],
                    'created_at' => $provider->created_at->toDateTimeLocalString(),
                ],
            ],
        ]);
    }

    #[Test]
    public function checkThatTheCorrectNumberOfProviderIsReturned(): void
    {
        $quantityProviders = 5;

        Provider::factory()
            ->count(5)
            ->has(Address::factory())
            ->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $this->assertCount($quantityProviders, $response->json('data'));
    }

    #[Test]
    public function checkIfDeletedProviderAreNotReturned(): void
    {
        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();

        $provider->delete();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $response->assertJsonMissing(['id' => $provider->id]);
    }
}
