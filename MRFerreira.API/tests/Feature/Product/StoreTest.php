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

class StoreTest extends CustomTestCase
{
    private const ENDPOINT = '/api/products';

    #[Test]
    public function returnStatusCode201WhenProductIsCreatedWithFullData(): void
    {
        Storage::fake('firebase');

        $category = Category::factory()->create();
        $provider = Provider::factory()->create();

        $product = Product::factory()->make([
            'id_provider' => $provider->id,
            'id_category' => $category->id,
        ]);

        $file = UploadedFile::fake()->image('photo.jpg');

        $body = [
            'name' => $product->name,
            'description' => $product->description,
            'photo' => $file,
            'id_provider' => $product->id_provider,
            'id_category' => $product->id_category,
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
        });

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $body);

        $response
            ->assertCreated()
            ->assertJsonStructure([
                'data' => ['id'],
            ]);
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
            'description',
            'id_provider',
            'id_category',
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors($fieldWithErrors);
    }

    #[Test]
    public function checkIfTheProductIsSavedInTheDatabase(): void
    {
        Storage::fake('firebase');

$category = Category::factory()->create();
        $provider = Provider::factory()->create();

        $product = Product::factory()->make([
            'id_provider' => $provider->id,
            'id_category' => $category->id,
        ]);

        $file = UploadedFile::fake()->image('photo.jpg');

        $body = [
            'name' => $product->name,
            'description' => $product->description,
            'photo' => $file,
            'id_provider' => $product->id_provider,
            'id_category' => $product->id_category,
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
        });

        $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $body);

        $this->assertDatabaseHas(
            'products',
            [
                'name' => $product->name,
                'description' => $product->description,
                'id_provider' => $product->id_provider,
                'id_category' => $product->id_category,
            ],
        );
    }
}
