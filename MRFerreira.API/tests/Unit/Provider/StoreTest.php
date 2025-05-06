<?php

namespace Tests\Unit\Provider;

use App\Http\Requests\Provider\StoreRequest;
use Generator;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Attributes\{
    DataProvider,
    Test,
};
use Tests\CustomTestCase;

class StoreTest extends CustomTestCase
{
    private StoreRequest $request;

    protected function setUp(): void
    {
        parent::setUp();

        $this->request = new StoreRequest();
    }

    #[Test]
    public function checkIfValidatorNotFailWhenOnlyMandatoryDataSend(): void
    {
        $dataToPassValidation = [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'address' => [
                'zipcode' => fake()->numerify('########'),
                'street' => fake()->streetName(),
                'number' => fake()->regexify('[1-9]{4}'),
                'neighborhood' => fake()->streetAddress(),
                'state' => fake()->stateAbbr(),
                'city' => fake()->city(),
            ],
        ];

        $validator = Validator::make(
            $dataToPassValidation,
            $this->request->rules(),
        );

        $this->assertFalse($validator->fails());
    }

    public static function validValuesForSpecificFields(): Generator
    {
        yield 'max size' => [
            [
                'name' => str_repeat(fake()->lexify('?'), 128),
                'phone' => str_repeat(fake()->numerify('#'), 15),
                'cellphone' => str_repeat(fake()->numerify('#'), 15),
                'address' => [
                    'street' => str_repeat(fake()->lexify('?'), 256),
                    'number' => str_repeat(fake()->numerify('#'), 4),
                    'neighborhood' => str_repeat(fake()->lexify('?'), 256),
                    'state' => str_repeat(fake()->lexify('?'), 32),
                    'city' => str_repeat(fake()->lexify('?'), 256),
                ],
            ],
            [
                'name',
                'phone',
                'cellphone',
                'address.street',
                'address.number',
                'address.neighborhood',
                'address.state',
                'address.city',
            ],
        ];

        yield 'min size' => [
            [
                'name' => fake()->name(),
                'email' => fake()->email(),
                'address' => [
                    'zipcode' => fake()->numerify('########'),
                    'street' => fake()->streetName(),
                    'number' => fake()->regexify('[1-9]{4}'),
                    'neighborhood' => fake()->streetAddress(),
                    'state' => fake()->stateAbbr(),
                    'city' => fake()->city(),
                ],
            ],
            [
                'name',
                'email',
                'address.zipcode',
                'address.street',
                'address.number',
                'address.neighborhood',
                'address.state',
                'address.city',
            ],
        ];

        yield 'required' => [
            [
                'name' => fake()->name(),
                'email' => fake()->email(),
                'address' => [
                    'zipcode' => fake()->numerify('########'),
                    'street' => fake()->streetName(),
                    'number' => fake()->regexify('[1-9]{4}'),
                    'neighborhood' => fake()->streetAddress(),
                    'state' => fake()->stateAbbr(),
                    'city' => fake()->city(),
                ],
            ],
            [
                'name',
                'email',
                'address.zipcode',
                'address.street',
                'address.number',
                'address.neighborhood',
                'address.state',
                'address.city',
            ],
        ];
    }

    #[Test]
    #[DataProvider('validValuesForSpecificFields')]
    public function assertThatValidatorDoesNotFailWhenTheFollowingRuleIsTested(
        array $data,
        array $fieldsWithoutError,
    ): void {
        $validator = Validator::make(
            $data,
            $this->request->rules(),
        );

        $errors = $validator
            ->errors()
            ->toArray();
        $errorKeys = array_keys($errors);

        $this->assertEmpty(array_intersect($fieldsWithoutError, $errorKeys));
    }

    public static function invalidValuesForSpecificFields(): Generator
    {
        yield 'max size' => [
            [
                'name' => str_repeat(fake()->lexify('?'), 129),
                'phone' => str_repeat(fake()->numerify('#'), 16),
                'cellphone' => str_repeat(fake()->numerify('#'), 16),
                'address' => [
                    'street' => str_repeat(fake()->lexify('?'), 257),
                    'number' => str_repeat(fake()->numerify('#'), 5),
                    'neighborhood' => str_repeat(fake()->lexify('?'), 257),
                    'state' => str_repeat(fake()->lexify('?'), 33),
                    'city' => str_repeat(fake()->lexify('?'), 257),
                ],
            ],
            [
                'name',
                'phone',
                'cellphone',
                'address.street',
                'address.number',
                'address.neighborhood',
                'address.state',
                'address.city',
            ],
        ];

        yield 'empty' => [
            [
                'name' => '',
                'email' => '',
                'address' => [
                    'zipcode' => '',
                    'street' => '',
                    'neighborhood' => '',
                    'number' => '',
                    'state' => '',
                    'city' => '',
                ],
            ],
            [
                'name',
                'email',
                'address.zipcode',
                'address.street',
                'address.number',
                'address.neighborhood',
                'address.state',
                'address.city',
            ],
        ];

        yield 'null' => [
            [
                'name' => null,
                'email' => null,
                'address' => [
                    'zipcode' => null,
                    'street' => null,
                    'neighborhood' => null,
                    'number' => null,
                    'state' => null,
                    'city' => null,
                ],
            ],
            [
                'name',
                'email',
                'address.zipcode',
                'address.street',
                'address.number',
                'address.neighborhood',
                'address.state',
                'address.city',
            ],
        ];

        yield 'missing' => [
            [],
            [
                'name',
                'name',
                'email',
                'address.zipcode',
                'address.street',
                'address.number',
                'address.neighborhood',
                'address.state',
                'address.city',
            ],
        ];
    }

    #[Test]
    #[DataProvider('invalidValuesForSpecificFields')]
    public function assertThatValidatorFailWhenTheFollowingRuleIsTested(
        array $data,
        array $fieldsWithError,
    ): void {
        $validator = Validator::make(
            $data,
            $this->request->rules(),
        );

        $errors = $validator
            ->errors()
            ->toArray();
        $errorKeys = array_keys($errors);

        $this->assertCount(
            count($fieldsWithError),
            array_intersect($fieldsWithError, $errorKeys)
        );
    }

    public static function invalidCNPJRegex(): Generator
    {
        yield 'above max size' => [
            fake()->numerify('[0-9]{15}'),
        ];
        yield 'below min size' => [
            fake()->numerify('[0-9]{13}'),
        ];
        yield 'with non numeric characters' => [
            fake()->regexify('[a-Z]{14}'),
        ];
    }

    #[Test]
    #[DataProvider('invalidCNPJRegex')]
    public function assertThatValidatorFailWhenCnpjDoesNotMatchWithRegex(string $cnpj): void
    {
        $data = [
            'cnpj' => $cnpj
        ];

        $validator = Validator::make($data, $this->request->rules());
        $errors = $validator->errors();

        $cnpjError = $errors->get('cnpj');

        $this->assertNotEmpty($cnpjError);

        $this->assertEquals(
            __('validation.regex', ['attribute' => 'cnpj']),
            $cnpjError[0],
        );
    }

    public static function validCNPJRegex(): Generator
    {
        yield 'expected size' => [
            fake()->regexify('[0-9]{14}'),
        ];
        yield 'with only numeric characters' => [
            fake()->regexify('[0-9]{14}'),
        ];
    }

    #[Test]
    #[DataProvider('validCNPJRegex')]
    public function assertThatValidatorDoesNotFailWhenCnpjMatchWithRegex(string $cnpj): void
    {
        $data = [
            'cnpj' => $cnpj,
        ];

        $validator = Validator::make(
            $data,
            $this->request->rules(),
        );
        $errors = $validator->errors();

        $cnpjError = $errors->get('cnpj');

        $this->assertEmpty($cnpjError);
    }
}
