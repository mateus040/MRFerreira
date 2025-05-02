<?php

namespace Tests\Feature\Category;

use App\Models\Category;
use PHPUnit\Framework\Attributes\Test;
use Tests\CustomTestCase;

class ShowTest extends CustomTestCase
{
    private const ENDPOINT = '/api/categories';

    #[Test]
    public function returnStatusCode200WhenRequestIsSuccessfully(): void
    {
        $category = Category::factory()->create();

        $response = $this->getJson(self::ENDPOINT . '/' . $category->id);

        $response
            ->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'created_at' => $category->created_at->toDateTimeLocalString(),
                ],
            ]);
    }

    #[Test]
    /** @test */
    public function returnStatusCode404IfCategoryNotExists(): void
    {
        $response = $this->getJson(self::ENDPOINT . '/0');

        $response
            ->assertNotFound();
            // ->assertJson(
            //     [
            //         'message' => __('exceptions.not_found'),
            //     ],
            // );
    }
}
