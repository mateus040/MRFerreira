<?php

namespace Tests\Feature\Provider;

use App\Models\{
    Address,
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
    private const ENDPOINT = '/api/providers';

    #[Test]
    public function returnStatusCode204WhenProviderIsUpdated(): void
    {
        Storage::fake('firebase');

        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();

        $file = UploadedFile::fake()->image('logo.jpg');

        $body = [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'logo' => $file,
            'address' => [
                'zipcode' => fake()->numerify('########'),
                'street' => fake()->streetName(),
                'number' => fake()->regexify('[1-9]{4}'),
                'neighborhood' => fake()->streetAddress(),
                'state' => fake()->stateAbbr(),
                'city' => fake()->city(),
            ],
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
            $mock->shouldReceive('deleteFile')->andReturnTrue();
        });

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/' . $provider->id, $body);

        $response->assertNoContent();
    }

    #[Test]
    public function returnStatusCode401WhenRequestWithoutValidToken(): void
    {
        $response = $this->putJson(self::ENDPOINT . '/0');

        $response->assertUnauthorized();
    }

    #[Test]
    public function returnStatusCode404IfProviderNotFound(): void
    {
        Storage::fake('firebase');

        Provider::factory()
            ->has(Address::factory())
            ->create();

        $file = UploadedFile::fake()->image('logo.jpg');

        $body = [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'logo' => $file,
            'address' => [
                'zipcode' => fake()->numerify('########'),
                'street' => fake()->streetName(),
                'number' => fake()->regexify('[1-9]{4}'),
                'neighborhood' => fake()->streetAddress(),
                'state' => fake()->stateAbbr(),
                'city' => fake()->city(),
            ],
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
        $provider = Provider::factory()->create();

        $fieldWithErrors = [
            'name',
            'email',
            'address.zipcode',
            'address.street',
            'address.number',
            'address.neighborhood',
            'address.state',
            'address.city',
        ];

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/' . $provider->id, []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors($fieldWithErrors);
    }

    #[Test]
    public function checkIfTheCategoryHasBeenUpdatedInTheDatabase(): void
    {
        Storage::fake('firebase');

        $provider = Provider::factory()
            ->has(Address::factory())
            ->create();

        $file = UploadedFile::fake()->image('logo.jpg');

        $body = [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'logo' => $file,
            'address' => [
                'zipcode' => fake()->numerify('########'),
                'street' => fake()->streetName(),
                'number' => fake()->regexify('[1-9]{4}'),
                'neighborhood' => fake()->streetAddress(),
                'state' => fake()->stateAbbr(),
                'city' => fake()->city(),
            ],
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
            $mock->shouldReceive('deleteFile')->andReturnTrue();
        });

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->putJson(self::ENDPOINT . '/' . $provider->id, $body);

        $this->assertDatabaseHas(
            'providers',
            [
                'name' => $body['name'],
                'email' => $body['email'],
            ],
        );

        $this->assertDatabaseHas(
            'addresses',
            [
                'zipcode' => $body['address']['zipcode'],
                'street' => $body['address']['street'],
                'number' => $body['address']['number'],
                'neighborhood' => $body['address']['neighborhood'],
                'state' => $body['address']['state'],
                'city' => $body['address']['city'],
            ],
        );
    }
}
