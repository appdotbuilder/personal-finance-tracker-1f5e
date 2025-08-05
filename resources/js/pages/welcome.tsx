import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';



export default function Welcome() {
    return (
        <>
            <Head title="Personal Finance Tracker" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Navigation */}
                <nav className="flex justify-between items-center px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">💰</span>
                        <span className="text-xl font-bold text-gray-900">Finance Tracker</span>
                    </div>
                    <div className="space-x-4">
                        <Link href="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            💰 Personal Finance Tracker
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Take control of your finances with our comprehensive tracking solution. 
                            Monitor income, expenses, and build better financial habits.
                        </p>
                        <div className="space-x-4">
                            <Link href="/register">
                                <Button size="lg" className="px-8 py-3">
                                    Start Tracking Free
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-8 py-3">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="font-semibold mb-2">Dashboard Overview</h3>
                            <p className="text-gray-600 text-sm">
                                View your total income, expenses, and balance at a glance with interactive charts.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="text-3xl mb-4">💳</div>
                            <h3 className="font-semibold mb-2">Transaction Management</h3>
                            <p className="text-gray-600 text-sm">
                                Add, edit, and categorize your income and expenses with detailed descriptions.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="text-3xl mb-4">🏷️</div>
                            <h3 className="font-semibold mb-2">Smart Categories</h3>
                            <p className="text-gray-600 text-sm">
                                Organize transactions with customizable categories and color-coded labels.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="text-3xl mb-4">📈</div>
                            <h3 className="font-semibold mb-2">Export & Reports</h3>
                            <p className="text-gray-600 text-sm">
                                Export your data to PDF or Excel for detailed financial analysis.
                            </p>
                        </div>
                    </div>

                    {/* Screenshot/Demo Section */}
                    <div className="mt-20">
                        <div className="bg-white rounded-lg shadow-lg p-8 border">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    🎯 Everything You Need to Manage Your Money
                                </h2>
                                <p className="text-gray-600">
                                    From daily expenses to monthly budgets, track it all in one place.
                                </p>
                            </div>
                            
                            {/* Mock Dashboard Preview */}
                            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <div className="text-green-600 font-semibold">Total Income</div>
                                        <div className="text-2xl font-bold text-green-700">$5,250.00</div>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <div className="text-red-600 font-semibold">Total Expenses</div>
                                        <div className="text-2xl font-bold text-red-700">$3,180.50</div>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <div className="text-blue-600 font-semibold">Net Balance</div>
                                        <div className="text-2xl font-bold text-blue-700">$2,069.50</div>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-4 rounded border">
                                    <div className="text-sm text-gray-500 mb-2">Recent Transactions</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <span className="text-green-600 text-sm">💼</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">Monthly Salary</div>
                                                    <div className="text-xs text-gray-500">Salary • Today</div>
                                                </div>
                                            </div>
                                            <div className="text-green-600 font-semibold">+$5,000.00</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                    <span className="text-orange-600 text-sm">🍕</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">Lunch at Pizza Place</div>
                                                    <div className="text-xs text-gray-500">Food & Dining • Yesterday</div>
                                                </div>
                                            </div>
                                            <div className="text-red-600 font-semibold">-$25.50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Ready to Take Control of Your Finances? 🚀
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join thousands of users who are already managing their money better.
                        </p>
                        <Link href="/register">
                            <Button size="lg" className="px-12 py-4 text-lg">
                                Get Started Now - It's Free!
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-gray-200 py-8 px-6">
                    <div className="max-w-7xl mx-auto text-center text-gray-600">
                        <p>&copy; 2024 Personal Finance Tracker. Built with ❤️ for better financial health.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}