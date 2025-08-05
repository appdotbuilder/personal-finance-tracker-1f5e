<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Calculate totals
        $totalIncome = $user->transactions()->where('type', 'income')->sum('amount');
        $totalExpense = $user->transactions()->where('type', 'expense')->sum('amount');
        $balance = $totalIncome - $totalExpense;

        // Current month data
        $currentMonth = Carbon::now()->startOfMonth();
        $monthlyIncome = $user->transactions()
            ->where('type', 'income')
            ->where('date', '>=', $currentMonth)
            ->sum('amount');
        
        $monthlyExpense = $user->transactions()
            ->where('type', 'expense')
            ->where('date', '>=', $currentMonth)
            ->sum('amount');

        // Monthly summary for chart (last 12 months)
        $monthlySummary = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthStart = $date->copy()->startOfMonth();
            $monthEnd = $date->copy()->endOfMonth();
            
            $income = $user->transactions()
                ->where('type', 'income')
                ->whereBetween('date', [$monthStart, $monthEnd])
                ->sum('amount');
                
            $expense = $user->transactions()
                ->where('type', 'expense')
                ->whereBetween('date', [$monthStart, $monthEnd])
                ->sum('amount');

            $monthlySummary[] = [
                'month' => $date->format('M Y'),
                'income' => (float) $income,
                'expense' => (float) $expense,
            ];
        }

        // Recent transactions
        $recentTransactions = $user->transactions()
            ->with('category')
            ->latest('date')
            ->take(5)
            ->get();

        // Category breakdown
        $categoryBreakdown = $user->transactions()
            ->with('category')
            ->selectRaw('category_id, SUM(amount) as total, type')
            ->groupBy('category_id', 'type')
            ->get()
            ->groupBy('category.name')
            ->map(function ($transactions) {
                $income = $transactions->where('type', 'income')->sum('total');
                $expense = $transactions->where('type', 'expense')->sum('total');
                return [
                    'income' => (float) $income,
                    'expense' => (float) $expense,
                    'net' => (float) ($income - $expense),
                ];
            });

        return Inertia::render('dashboard', [
            'summary' => [
                'totalIncome' => (float) $totalIncome,
                'totalExpense' => (float) $totalExpense,
                'balance' => (float) $balance,
                'monthlyIncome' => (float) $monthlyIncome,
                'monthlyExpense' => (float) $monthlyExpense,
            ],
            'monthlySummary' => $monthlySummary,
            'recentTransactions' => $recentTransactions,
            'categoryBreakdown' => $categoryBreakdown,
        ]);
    }
}