<?php

namespace Tests\Feature\Product;

use App\Models\{
    Category,
    Product,
    Provider,
};
use App\Services\FirebaseStorageService;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class UpdateTest extends CustomTestCase
{
    private const ENDPOINT = '/api/products';

    #[Test]
    public function returnStatusCode204WhenProductIsUpdated(): void
    {
        Storage::fake('firebase');

        $category = Category::factory()->create();
        $provider = Provider::factory()->create();
        $product = Product::factory()->create();

        $file = UploadedFile::fake()->image('photo.jpg');

        $body = [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'photo' => $file,
            'id_provider' => $provider->id,
            'id_category' => $category->id,
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
            $mock->shouldReceive('deleteFile')->andReturnTrue();
        });

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/' . $product->id, $body);

        $response->assertNoContent();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->putJson(self::ENDPOINT . '/0');

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode404IfProductNotFound(): void
    {
        Storage::fake('firebase');

        $category = Category::factory()->create();
        $provider = Provider::factory()->create();
        Product::factory()->create();

        $file = UploadedFile::fake()->image('photo.jpg');

        $body = [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'photo' => $file,
            'id_provider' => $provider->id,
            'id_category' => $category->id,
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
            $mock->shouldReceive('deleteFile')->andReturnTrue();
        });

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
        $product = Product::factory()->create();

        $fieldWithErrors = [
            'name',
            'description',
            'id_provider',
            'id_category',
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/' . $product->id, []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors($fieldWithErrors);
    }

    #[Test]
    public function checkIfTheProductHasBeenUpdatedInTheDatabase(): void
    {
        Storage::fake('firebase');

        $category = Category::factory()->create();
        $provider = Provider::factory()->create();
        $product = Product::factory()->create();

        $file = UploadedFile::fake()->image('photo.jpg');

        $body = [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'photo' => $file,
            'id_provider' => $provider->id,
            'id_category' => $category->id,
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
            $mock->shouldReceive('deleteFile')->andReturnTrue();
        });

        $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/' . $product->id, $body);

        $this->assertDatabaseHas(
            'products',
            [
                'name' => $body['name'],
                'description' => $body['description'],
                'id_provider' => $body['id_provider'],
                'id_category' => $body['id_category'],
            ]
        );
    }
}
