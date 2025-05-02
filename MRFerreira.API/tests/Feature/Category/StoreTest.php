<?php

namespace Tests\Feature\Category;

use App\Models\Category;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class StoreTest extends CustomTestCase
{
    private const ENDPOINT = '/api/categories';

    #[Test]
    public function returnStatusCode201WhenCategoryIsCreatedWithFullData(): void
    {
        $category = Category::factory()->make();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $category->getAttributes());

        $response->assertCreated();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->postJson(self::ENDPOINT);

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode422WhenFieldsHaveAnError(): void
    {
        $fieldWithErrors = [
            'name',
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors($fieldWithErrors);
    }

    #[Test]
    public function checkIfTheCategoryIsSavedInTheDatabase(): void
    {
        $category = Category::factory()->make();

        $body = [
            'name' => $category->name,
        ];

        $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $body);

        $this->assertDatabaseHas(
            'categories',
            [
                'name' => $body['name'],
            ]
        );
    }

    #[Test]
    public function returnStatusCode422WhenANewCategoryHasADuplicateName(): void
    {
        $category = Category::factory()->create();

        $categoryNameDuplicate = Category::factory()->make([
            'name' => $category->name,
        ]);

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $categoryNameDuplicate->getAttributes());

        $response->assertUnprocessable();
    }
}
