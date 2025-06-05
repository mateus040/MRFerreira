<?php

namespace Tests\Feature\Category\Product;

use App\Models\{
    Category,
    Provider,
    Address,
    Product,
};
use Illuminate\Database\Eloquent\Factories\Sequence;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class IndexTest extends CustomTestCase
{
    private const ENDPOINT = '/api/categories';

    #[Test]
    public function returnStatusCode200WhenRequestIsSuccessfully(): void
    {
        $category = Category::factory()->create();

        $response = $this->getJson(self::ENDPOINT . '/' . $category->id . '/products');

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
    public function returnStatusCode404IfCategoryNotExists(): void
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
    public function checkIfTheProductDataFromTheCategoryWasReturned(): void
    {
        $category = Category::factory()->create();
        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();
        $product = Product::factory()->create([
            'id_category' => $category->id,
            'id_provider' => $provider->id,
        ]);

        $address = $provider
            ->addresses
            ->first();

        $response = $this->getJson(self::ENDPOINT . '/' . $category->id . '/products');

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
    public function checkThatTheCorrectNumberOfProductFromTheCategoryIsReturned(): void
    {
        $quantityProducts = 5;

        $category = Category::factory()->create();
        Product::factory()
            ->count($quantityProducts)
            ->create([
                'id_category' => $category->id,
            ]);

        $response = $this->getJson(self::ENDPOINT . '/' . $category->id . '/products');

        $this->assertCount($quantityProducts, $response->json('data'));
    }

    #[Test]
    public function checkIfOnlyProductsFromTheQueryCategoryAreReturned(): void
    {
        $category = Category::factory()->create();

        $products = Product::factory()
            ->count(2)
            ->state(new Sequence(
                ['id_category' => $category->id],
                ['id_category' => Category::factory()],
            ))
            ->create();

        $response = $this->getJson(self::ENDPOINT . '/' . $category->id . '/products');

        $response
            ->assertJsonFragment(['id' => $products[0]->id])
            ->assertJsonMissing(['id' => $products[1]->id]);
    }

    #[Test]
    public function checkIfEmptyIsReturnedWhenTheCategoryHasNoProducts(): void
    {
        $category = Category::factory()->create();

        $response = $this->getJson(self::ENDPOINT . '/' . $category->id . '/products');

        $this->assertEmpty($response->json('data'));
    }
}
