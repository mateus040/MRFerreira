<?php

namespace Tests\Feature\Provider;

use App\Models\{
    Address,
    Provider,
};
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class ShowTest extends CustomTestCase
{
    private const ENDPOINT = '/api/providers';

    #[Test]
    public function returnStatusCode200WhenRequestIsSuccessfully(): void
    {
        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();

        $provider->load('addresses');

        $address = $provider
            ->addresses
            ->first();

        $response = $this->getJson(self::ENDPOINT . '/' . $provider->id);

        $response
            ->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $provider->id,
                    'name' => $provider->name,
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
            ]);
    }

    #[Test]
    public function returnStatusCode404IfProviderNotExists(): void
    {
        $response = $this->getJson(self::ENDPOINT . '/0');

        $response
            ->assertNotFound();
            // ->assertJson(
            //     [
            //         'message' => __('exceptions.not_found'),
            //     ],
            // );
    }
}
