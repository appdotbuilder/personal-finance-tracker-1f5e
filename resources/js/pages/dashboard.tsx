import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { 
    TrendingUp, 
    TrendingDown, 
    Wallet, 
    Plus,
    CreditCard,
    PieChart
} from 'lucide-react';

interface Transaction {
    id: number;
    name: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    category: {
        name: string;
        color: string;
    };
}

interface MonthlySummary {
    month: string;
    income: number;
    expense: number;
}

interface Props {
    summary: {
        totalIncome: number;
        totalExpense: number;
        balance: number;
        monthlyIncome: number;
        monthlyExpense: number;
    };
    monthlySummary: MonthlySummary[];
    recentTransactions: Transaction[];
    categoryBreakdown: Record<string, { income: number; expense: number; net: number }>;
    [key: string]: unknown;
}

export default function Dashboard({ 
    summary, 
    monthlySummary, 
    recentTransactions, 
    categoryBreakdown 
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">💰 Financial Overview</h1>
                        <p className="text-gray-600">Track your income, expenses, and financial health</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/transactions/create">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Transaction
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Income</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(summary.totalIncome)}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    This month: {formatCurrency(summary.monthlyIncome)}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {formatCurrency(summary.totalExpense)}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    This month: {formatCurrency(summary.monthlyExpense)}
                                </p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-full">
                                <TrendingDown className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                                <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                    {formatCurrency(summary.balance)}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Overall financial position
                                </p>
                            </div>
                            <div className={`p-3 rounded-full ${summary.balance >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                                <Wallet className={`w-6 h-6 ${summary.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">📈 Monthly Trends</h3>
                            <PieChart className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {monthlySummary.slice(-6).map((month, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{month.month}</span>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span className="text-sm text-green-600">
                                                {formatCurrency(month.income)}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-red-600">
                                                {formatCurrency(month.expense)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">💳 Recent Transactions</h3>
                            <Link href="/transactions">
                                <Button variant="ghost" size="sm">View All</Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentTransactions.length > 0 ? (
                                recentTransactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div 
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                                                style={{ backgroundColor: transaction.category.color }}
                                            >
                                                {transaction.category.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">
                                                    {transaction.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {transaction.category.name} • {formatDate(transaction.date)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`font-semibold ${
                                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>No transactions yet</p>
                                    <Link href="/transactions/create" className="text-blue-600 hover:text-blue-700 text-sm">
                                        Add your first transaction
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                {Object.keys(categoryBreakdown).length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">🏷️ Category Breakdown</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(categoryBreakdown).map(([category, data]) => (
                                <div key={category} className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-green-600">Income:</span>
                                            <span className="font-medium">{formatCurrency(data.income)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-red-600">Expense:</span>
                                            <span className="font-medium">{formatCurrency(data.expense)}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-1">
                                            <span className="text-gray-700">Net:</span>
                                            <span className={`font-medium ${data.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatCurrency(data.net)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/transactions/create">
                            <Button variant="outline" className="w-full justify-start">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Transaction
                            </Button>
                        </Link>
                        <Link href="/categories">
                            <Button variant="outline" className="w-full justify-start">
                                <PieChart className="w-4 h-4 mr-2" />
                                Manage Categories
                            </Button>
                        </Link>
                        <Link href="/transactions">
                            <Button variant="outline" className="w-full justify-start">
                                <CreditCard className="w-4 h-4 mr-2" />
                                View All Transactions
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}