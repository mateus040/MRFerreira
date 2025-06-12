<?php

namespace Tests\Unit\Requests\User;

use App\Http\Requests\User\PatchRequest;
use Generator;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Attributes\{
    Test,
    DataProvider,
};
use Tests\CustomTestCase;

class PatchTest extends CustomTestCase
{
    private PatchRequest $request;

    protected function setUp(): void
    {
        parent::setUp();

        $this->request = new PatchRequest();
    }

    #[Test]
    public function checkIfValidatorNotFailWhenOnlyMandatoryDataSend(): void
    {
        $dataToPassValidation = [
            'name' => fake()->name(),
            'email' => fake()->email(),
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
        yield 'null' => [
            [
                'name' => null,
                'email' => null,
            ],
            [
                'name',
                'email',
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
