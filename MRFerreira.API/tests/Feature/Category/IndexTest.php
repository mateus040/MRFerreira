<?php

namespace Tests\Feature\Category;

use App\Models\Category;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class IndexTest extends CustomTestCase
{
    private const ENDPOINT = '/api/categories';
    
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
                    ],
                ],
            ]);
    }

    #[Test]
    public function checkIfTheCategoryDataWasReturned(): void
    {
        $category = Category::factory()->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $response
            ->assertJson([
                'data' => [
                    [
                        'id' => $category->id,
                        'name' => $category->name,
                        'created_at' => $category->created_at->toDateTimeLocalString(),
                    ],
                ],
            ]);
    }

    #[Test]
    public function checkThatTheCorrectNumberOfCategoriesIsReturned(): void
    {
        $quantityCategories = 5;

        Category::factory()
            ->count($quantityCategories)
            ->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $this->assertCount($quantityCategories, $response->json('data'));
    }

    #[Test]
    public function checkIfDeletedCategoriesAreNotReturned(): void
    {
        $category = Category::factory()->create();

        $category->delete();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->getJson(self::ENDPOINT);

        $response->assertJsonMissing(['id' => $category->id]);
    }
}
