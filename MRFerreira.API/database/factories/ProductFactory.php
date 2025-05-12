<?php

namespace Database\Factories;

use App\Models\{
    Category,
    Provider,
};
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_provider' => Provider::factory(),
            'id_category' => Category::factory(),
            'name' => fake()->name(),
            'description' => fake()->text(),
            'photo' => 'photo.png',
        ];
    }
}
