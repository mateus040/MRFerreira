<?php

namespace Tests\Unit\Requests\User;

use App\Http\Requests\User\RegisterRequest;
use Generator;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Attributes\{
    Test,
    DataProvider,
};
use Tests\CustomTestCase;

class RegisterTest extends CustomTestCase
{
    private RegisterRequest $request;

    protected function setUp(): void
    {
        parent::setUp();

        $this->request = new RegisterRequest();
    }

    #[Test]
    public function checkIfValidatorNotFailWhenOnlyMandatoryDataSend(): void
    {
        $dataToPassValidation = [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'password' => fake()->password(),
        ];

        $validator = Validator::make(
            $dataToPassValidation,
            $this->request->rules(),
        );

        $this->assertFalse($validator->fails());
    }

    public static function validValuesForSpecificFields(): Generator
    {
        yield 'min size' => [
            [
                'password' => fake()->password(6),
            ],
            [
                'password',
            ],
        ];

        yield 'required' => [
            [
                'name' => fake()->name(),
                'email' => fake()->email(),
                'password' => fake()->password(),
            ],
            [
                'name',
                'email',
                'password',
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
        yield 'empty' => [
            [
                'name' => '',
                'email' => '',
                'password' => '',
            ],
            [
                'name',
                'email',
                'password',
            ],
        ];

        yield 'null' => [
            [
                'name' => null,
                'email' => null,
                'password' => null,
            ],
            [
                'name',
                'email',
                'password',
            ],
        ];

        yield 'missing' => [
            [],
            [
                'name',
                'email',
                'password',
            ],
        ];
    }

    #[Test]
    #[DataProvider('invalidValuesForSpecificFields')]
    public function assertThatValidatorFailsWhenTheFollowingRuleIsTested(
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
