<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $users = User::all();

        $defaultCategories = [
            ['name' => 'Salary', 'color' => '#10B981', 'description' => 'Monthly salary and wages'],
            ['name' => 'Food & Dining', 'color' => '#F59E0B', 'description' => 'Restaurants, groceries, and food expenses'],
            ['name' => 'Transportation', 'color' => '#3B82F6', 'description' => 'Gas, public transport, car expenses'],
            ['name' => 'Entertainment', 'color' => '#8B5CF6', 'description' => 'Movies, games, leisure activities'],
            ['name' => 'Shopping', 'color' => '#EF4444', 'description' => 'Clothing, electronics, general shopping'],
            ['name' => 'Healthcare', 'color' => '#06B6D4', 'description' => 'Medical expenses and insurance'],
            ['name' => 'Utilities', 'color' => '#84CC16', 'description' => 'Electricity, water, internet bills'],
            ['name' => 'Investment', 'color' => '#14B8A6', 'description' => 'Stocks, bonds, investment returns'],
        ];

        foreach ($users as $user) {
            foreach ($defaultCategories as $categoryData) {
                Category::create([
                    'user_id' => $user->id,
                    'name' => $categoryData['name'],
                    'color' => $categoryData['color'],
                    'description' => $categoryData['description'],
                ]);
            }
        }
    }
}