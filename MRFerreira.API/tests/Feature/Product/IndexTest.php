<?php

namespace Tests\Feature\Product;

use App\Models\{
    Address,
    Category,
    Product,
    Provider,
};
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class IndexTest extends CustomTestCase
{
    private const ENDPOINT = '/api/products';

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
    public function checkIfTheProductDataWasReturned(): void
    {
        $category = Category::factory()->create();
        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();

        $product = Product::factory()->create([
            'id_provider' => $provider->id,
            'id_category' => $category->id,
        ]);

        $address = $provider
            ->addresses
            ->first();

        $response = $this->getJson(self::ENDPOINT);

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
                        'id' => $category->id,
                        'name' => $category->name,
                        'created_at' => $category->created_at->toDateTimeLocalString(),
                    ],
                    'created_at' => $product->created_at->toDateTimeLocalString(),
                ],
            ],
        ]);
    }

    #[Test]
    public function checkThatTheCorrectNumberOfProductIsReturned(): void
    {
        $quantityProducts = 5;

        Product::factory()
            ->count($quantityProducts)
            ->create();

        $response = $this->getJson(self::ENDPOINT);

        $this->assertCount($quantityProducts, $response->json('data'));
    }

    #[Test]
    public function checkIfDeletedProductsAreNotReturned(): void
    {
        $product = Product::factory()->create();

        $product->delete();

        $response = $this->getJson(self::ENDPOINT);

        $response->assertJsonMissing(['id' => $product->id]);
    }
}
