<?php

namespace Tests\Feature\Category;

use App\Models\Category;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class DestroyTest extends CustomTestCase
{
    private const ENDPOINT = '/api/categories';

    #[Test]
    public function returnStatusCode204WhenCategoryIsDeleted(): void
    {
        $category = Category::factory()->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $category->id);

        $response->assertNoContent();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->deleteJson(self::ENDPOINT . '/0');

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode404WhenCategoryIsNotFound(): void
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
    public function checkIfTheCategoryHasBeenDeletedFromTheDatabase(): void
    {
        $category = Category::factory()->create();

        $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $category->id);

        $this->assertDatabaseMissing(
            'categories',
            [
                'id' => $category->id,
            ]
        );
    }
}
