<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'zipcode' => fake()->numerify('########'),
            'street' => fake()->streetName(),
            'number' => fake()->regexify('[1-9]{4}'),
            'neighborhood' => fake()->streetAddress(),
            'state' => fake()->stateAbbr(),
            'city' => fake()->city(),
        ];
    }
}
