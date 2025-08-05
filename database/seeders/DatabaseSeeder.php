<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create categories for the test user
        $categories = [
            ['name' => 'Salary', 'color' => '#10B981', 'description' => 'Monthly salary and wages'],
            ['name' => 'Food & Dining', 'color' => '#F59E0B', 'description' => 'Restaurants, groceries, and food expenses'],
            ['name' => 'Transportation', 'color' => '#3B82F6', 'description' => 'Gas, public transport, car expenses'],
            ['name' => 'Entertainment', 'color' => '#8B5CF6', 'description' => 'Movies, games, leisure activities'],
            ['name' => 'Shopping', 'color' => '#EF4444', 'description' => 'Clothing, electronics, general shopping'],
            ['name' => 'Healthcare', 'color' => '#06B6D4', 'description' => 'Medical expenses and insurance'],
            ['name' => 'Utilities', 'color' => '#84CC16', 'description' => 'Electricity, water, internet bills'],
            ['name' => 'Investment', 'color' => '#14B8A6', 'description' => 'Stocks, bonds, investment returns'],
        ];

        foreach ($categories as $categoryData) {
            $user->categories()->create($categoryData);
        }

        // Create sample transactions
        /** @var Category|null $salaryCategory */
        $salaryCategory = $user->categories()->where('name', 'Salary')->first();
        /** @var Category|null $foodCategory */
        $foodCategory = $user->categories()->where('name', 'Food & Dining')->first();
        /** @var Category|null $transportCategory */
        $transportCategory = $user->categories()->where('name', 'Transportation')->first();

        if ($salaryCategory) {
            // Sample income transactions
            $user->transactions()->create([
                'category_id' => $salaryCategory->id,
                'date' => now()->subDays(5),
                'name' => 'Monthly Salary',
                'description' => 'Software Developer Salary',
                'amount' => 5000.00,
                'type' => 'income',
            ]);
        }

        if ($foodCategory) {
            // Sample expense transactions
            $user->transactions()->create([
                'category_id' => $foodCategory->id,
                'date' => now()->subDays(2),
                'name' => 'Grocery Shopping',
                'description' => 'Weekly groceries at Whole Foods',
                'amount' => 125.50,
                'type' => 'expense',
            ]);
        }

        if ($transportCategory) {
            $user->transactions()->create([
                'category_id' => $transportCategory->id,
                'date' => now()->subDays(1),
                'name' => 'Gas Station',
                'description' => 'Shell gas station fill-up',
                'amount' => 45.00,
                'type' => 'expense',
            ]);
        }
    }
}
