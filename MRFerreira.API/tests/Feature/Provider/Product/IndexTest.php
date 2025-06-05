<?php

namespace Tests\Feature\Provider\Product;

use App\Models\{
    Provider,
    Product,
    Address,
};
use Illuminate\Database\Eloquent\Factories\Sequence;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class IndexTest extends CustomTestCase
{
    private const ENDPOINT = '/api/providers';

    #[Test]
    public function returnStatusCode200WhenRequestIsSuccessfully(): void
    {
        $provider = Provider::factory()->create();

        $response = $this->getJson(self::ENDPOINT . '/' . $provider->id . '/products');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'lenght',
                        'height',
                        'depth',
                        'weight',
                        'line',
                        'materials',
                        'photo',
                        'id_provider',
                        'id_category',
                        'provider',
                        'category',
                    ],
                ],
            ]);
    }

    #[Test]
    public function returnStatusCode404IfProviderNotExists(): void
    {
        $response = $this->getJson(self::ENDPOINT . '/0');

        $response
            ->assertNotFound()
            ->assertJson(
                [
                    'message' => __('exceptions.not_found'),
                ],
            );
    }

    #[Test]
    public function checkIfTheProductDataFromTheProviderWasReturned(): void
    {
        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();
        $product = Product::factory()->create([
            'id_provider' => $provider->id,
        ]);

        $address = $provider
            ->addresses
            ->first();

        $response = $this->getJson(self::ENDPOINT . '/' . $provider->id . '/products');

        $response->assertJson([
            'data' => [
                [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'id_provider' => $product->id_provider,
                    'id_category' => $product->id_category,
                    'provider' => [
                        'id' => $provider->id,
                        'name' => $provider->name,
                        'cnpj' => $provider->cnpj,
                        'email' => $provider->email,
                        'phone' => $provider->phone,
                        'cellphone' => $provider->cellphone,
                        'logo' => $provider->logo,
                        'logo_url' => $provider->logo_url,
                        'address' => [
                            'zipcode' => $address->zipcode,
                            'street' => $address->street,
                            'neighborhood' => $address->neighborhood,
                            'number' => $address->number,
                            'state' => $address->state,
                            'city' => $address->city,
                            'complement' => $address->complement,
                        ],
                        'created_at' => $provider->created_at->toDateTimeLocalString(),
                    ],
                    'category' => [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                        'created_at' => $product->category->created_at->toDateTimeLocalString(),
                    ],
                    'created_at' => $product->created_at->toDateTimeLocalString(),
                ],
            ],
        ]);
    }

    #[Test]
    public function checkThatTheCorrectNumberOfProductFromTheProviderIsReturned(): void
    {
        $quantityProducts = 5;

        $provider = Provider::factory()->create();
        Product::factory()
            ->count($quantityProducts)
            ->create([
                'id_provider' => $provider->id,
            ]);

        $response = $this->getJson(self::ENDPOINT . '/' . $provider->id . '/products');

        $this->assertCount($quantityProducts, $response->json('data'));
    }

    #[Test]
    public function checkIfOnlyProductsFromTheQueryProviderAreReturned(): void
    {
        $provider = Provider::factory()->create();

        $products = Product::factory()
            ->count(2)
            ->state(new Sequence(
                ['id_provider' => $provider->id],
                ['id_provider' => Provider::factory()],
            ))
            ->create();

        $response = $this->getJson(self::ENDPOINT . '/' . $provider->id . '/products');

        $response
            ->assertJsonFragment(['id' => $products[0]->id])
            ->assertJsonMissing(['id' => $products[1]->id]);
    }

    #[Test]
    public function checkIfEmptyIsReturnedWhenTheProviderHasNoProducts(): void
    {
        $provider = Provider::factory()->create();

        $response = $this->getJson(self::ENDPOINT . '/' . $provider->id . '/products');

        $this->assertEmpty($response->json('data'));
    }
}
