<?php

namespace Tests\Feature\Product;

use App\Models\Product;
use Illuminate\Auth\Middleware\Authenticate;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class DestroyTest extends CustomTestCase
{
    private const ENDPOINT = '/api/products';

    #[Test]
    public function returnStatusCode204WhenProductIsDeleted(): void
    {
        $product = Product::factory()->create();

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $product->id);

        $response->assertNoContent();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->deleteJson(self::ENDPOINT . '/0');

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode404WhenProductIsNotFound(): void
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
    public function checkIfTheProductHasBeenDeletedFromTheDatabase(): void
    {
        $product = Product::factory()->create();

        $this
            ->withoutMiddleware(Authenticate::class)
            ->deleteJson(self::ENDPOINT . '/' . $product->id);

        $this->assertDatabaseMissing(
            'products',
            [
                'id' => $product->id,
            ]
        );
    }
}
