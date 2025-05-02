<?php

namespace Tests\Unit\Category;

use App\Http\Requests\Category\StoreRequest;
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
            ],
            [
                'name',
            ],
        ];

        yield 'min size' => [
            [
                'name' => fake()->name(),
            ],
            [
                'name',
            ],
        ];

        yield 'required' => [
            [
                'name' => fake()->name(),
            ],
            [
                'name',
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
            ],
            [
                'name',
            ],
        ];

        yield 'min size or empty' => [
            [
                'name' => '',
            ],
            [
                'name',
            ],
        ];

        yield 'null' => [
            [
                'name' => null,
            ],
            [
                'name',
            ],
        ];

        yield 'missing' => [
            [],
            [
                'name',
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
