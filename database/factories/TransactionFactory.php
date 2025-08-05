<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['income', 'expense']);
        
        $incomeNames = [
            'Salary Payment',
            'Freelance Work',
            'Investment Return',
            'Bonus',
            'Side Hustle',
            'Gift Money',
        ];

        $expenseNames = [
            'Grocery Shopping',
            'Gas Station',
            'Restaurant',
            'Coffee Shop',
            'Movie Tickets',
            'Uber Ride',
            'Electric Bill',
            'Internet Bill',
            'Gym Membership',
            'Books',
        ];

        $name = $type === 'income' 
            ? $this->faker->randomElement($incomeNames)
            : $this->faker->randomElement($expenseNames);

        $amount = $type === 'income'
            ? $this->faker->randomFloat(2, 100, 5000)
            : $this->faker->randomFloat(2, 5, 500);

        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'name' => $name,
            'description' => $this->faker->optional(0.6)->sentence(),
            'amount' => $amount,
            'type' => $type,
        ];
    }
}