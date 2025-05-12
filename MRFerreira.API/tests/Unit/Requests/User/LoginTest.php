<?php

namespace Tests\Unit\Requests\User;

use App\Http\Requests\User\LoginRequest;
use Generator;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Attributes\{
    Test,
    DataProvider,
};
use Tests\CustomTestCase;

class LoginTest extends CustomTestCase
{
    private LoginRequest $request;

    protected function setUp(): void
    {
        parent::setUp();

        $this->request = new LoginRequest();
    }

    #[Test]
    public function checkIfValidatorNotFailWhenOnlyMandatoryDataSend(): void
    {
        $dataToPassValidation = [
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
        yield 'required' => [
            [
                'email' => fake()->email(),
                'password' => fake()->password(),
            ],
            [
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
                'email' => '',
                'password' => '',
            ],
            [
                'email',
                'password',
            ],
        ];

        yield 'null' => [
            [
                'email' => null,
                'password' => null,
            ],
            [
                'email',
                'password',
            ],
        ];

        yield 'missing' => [
            [],
            [
                'email',
                'password',
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
