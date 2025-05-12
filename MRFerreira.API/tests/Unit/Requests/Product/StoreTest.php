<?php

namespace Tests\Unit\Requests\Product;

use App\Http\Requests\Product\StoreRequest;
use App\Models\{
    Category,
    Provider,
};
use Generator;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Attributes\{
    Test,
    DataProvider,
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
        $provider = Provider::factory()->create();
        $category = Category::factory()->create();

        $dataToPassValidation = [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'id_provider' => $provider->id,
            'id_category' => $category->id,
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
                'name' => str_repeat(fake()->lexify('?'), 256),
                'length' => str_repeat(fake()->lexify('?'), 256),
                'height' => str_repeat(fake()->lexify('?'), 256),
                'depth' => str_repeat(fake()->lexify('?'), 256),
                'weight' => str_repeat(fake()->lexify('?'), 256),
                'line' => str_repeat(fake()->lexify('?'), 256),
            ],
            [
                'name',
                'length',
                'height',
                'depth',
                'weight',
                'line',
            ],
        ];

        yield 'min size' => [
            [
                'name' => fake()->name(),
                'description' => fake()->text(),
            ],
            [
                'name',
                'description',
            ],
        ];

        yield 'required' => [
            [
                'name' => fake()->name(),
                'description' => fake()->text(),
            ],
            [
                'name',
                'description',
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
                'name' => str_repeat(fake()->lexify('?'), 257),
                'length' => str_repeat(fake()->lexify('?'), 257),
                'height' => str_repeat(fake()->lexify('?'), 257),
                'depth' => str_repeat(fake()->lexify('?'), 257),
                'weight' => str_repeat(fake()->lexify('?'), 257),
                'line' => str_repeat(fake()->lexify('?'), 257),
            ],
            [
                'name',
                'length',
                'height',
                'depth',
                'weight',
                'line',
            ],
        ];

        yield 'empty' => [
            [
                'name' => '',
                'description' => '',
            ],
            [
                'name',
                'description',
            ],
        ];

        yield 'null' => [
            [
                'name' => null,
                'description' => null,
            ],
            [
                'name',
                'description',
            ],
        ];

        yield 'missing' => [
            [],
            [
                'name',
                'description',
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
}
