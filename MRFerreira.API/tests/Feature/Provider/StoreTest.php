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

class StoreTest extends CustomTestCase
{
    private const ENDPOINT = '/api/providers';

    #[Test]
    public function returnStatusCode201WhenProviderIsCreatedWithFullData(): void
    {
        Storage::fake('firebase');

        $provider = Provider::factory()->make();
        $address = Address::factory()->make();

        $file = UploadedFile::fake()->image('logo.jpg');

        $body = [
            'name' => $provider->name,
            'email' => $provider->email,
            'logo' => $file,
            'address' => [
                'zipcode' => $address->zipcode,
                'street' => $address->street,
                'number' => $address->number,
                'neighborhood' => $address->neighborhood,
                'state' => $address->state,
                'city' => $address->city,
            ],
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
            ->postJson(self::ENDPOINT, []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors($fieldWithErrors);
    }

    #[Test]
    public function returnStatusCode422WhenANewProviderHasADuplicateCnpj(): void
    {
        Storage::fake('firebase');

        $provider = Provider::factory()
            ->has(Address::factory())
            ->create([
                'cnpj' => fake()->numerify('##############'),
            ]);

        $providerCnpjDuplicate = Provider::factory()
            ->make([
                'cnpj' => $provider->cnpj,
            ]);
        $address = Address::factory()->make();

        $file = UploadedFile::fake()->image('logo.jpg');

        $body = [
            'name' => $providerCnpjDuplicate->name,
            'email' => $providerCnpjDuplicate->email,
            'cnpj' => $providerCnpjDuplicate->cnpj,
            'logo' => $file,
            'address' => [
                'zipcode' => $address->zipcode,
                'street' => $address->street,
                'number' => $address->number,
                'neighborhood' => $address->neighborhood,
                'state' => $address->state,
                'city' => $address->city,
            ],
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
        });

        $response = $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $body);

        $response->assertUnprocessable();
    }

    #[Test]
    public function checkIfTheProviderIsSavedInTheDatabase(): void
    {
        Storage::fake('firebase');

        $provider = Provider::factory()->make();
        $address = Address::factory()->make();

        $file = UploadedFile::fake()->image('logo.jpg');

        $body = [
            'name' => $provider->name,
            'email' => $provider->email,
            'logo' => $file,
            'address' => [
                'zipcode' => $address->zipcode,
                'street' => $address->street,
                'number' => $address->number,
                'neighborhood' => $address->neighborhood,
                'state' => $address->state,
                'city' => $address->city,
            ],
        ];

        $this->mock(FirebaseStorageService::class, function ($mock) {
            $mock->shouldReceive('uploadFile')->andReturnTrue();
        });

        $this
            ->withoutMiddleware(Authenticate::class)
            ->postJson(self::ENDPOINT, $body);

        $this->assertDatabaseHas(
            'providers',
            [
                'name' => $body['name'],
                'email' => $body['email'],
            ]
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
