<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Salary', 'color' => '#10B981'],
            ['name' => 'Food & Dining', 'color' => '#F59E0B'],
            ['name' => 'Transportation', 'color' => '#3B82F6'],
            ['name' => 'Entertainment', 'color' => '#8B5CF6'],
            ['name' => 'Shopping', 'color' => '#EF4444'],
            ['name' => 'Healthcare', 'color' => '#06B6D4'],
            ['name' => 'Utilities', 'color' => '#84CC16'],
            ['name' => 'Investment', 'color' => '#14B8A6'],
        ];

        $category = $this->faker->randomElement($categories);

        return [
            'user_id' => User::factory(),
            'name' => $category['name'],
            'color' => $category['color'],
            'description' => $this->faker->optional(0.7)->sentence(),
        ];
    }
}