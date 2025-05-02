<?php

namespace Tests\Feature\Category;

use App\Models\Category;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class UpdateTest extends CustomTestCase
{
    private const ENDPOINT = '/api/categories';

    #[Test]
    public function returnStatusCode204WhenCategoryIsUpdated(): void
    {
        $category = Category::factory()->create();

        $body = [
            'name' => fake()->name(),
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/' . $category->id, $body);

        $response->assertNoContent();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->putJson(self::ENDPOINT . '/0');

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode404IfCategoryNotFound(): void
    {
        Category::factory()->create();

        $body = [
            'name' => fake()->name(),
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/0', $body);

        $response
            ->assertNotFound();
            // ->assertJson(
            //     [
            //         'message' => __('exceptions.not_found')
            //     ]
            // );
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
    public function checkIfTheCategoryHasBeenUpdatedInTheDatabase(): void
    {
        $category = Category::factory()->create();

        $body = [
            'name' => fake()->name(),
        ];

        $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/' . $category->id, $body);

        $this->assertDatabaseHas(
            'categories',
            [
                'name' => $body['name'],
            ]
        );
    }
}
