import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Transaction {
    id: number;
    date: string;
    name: string;
    description?: string;
    category_id: number;
    amount: number;
    type: 'income' | 'expense';
}

interface Props {
    transaction: Transaction;
    categories: Category[];
    [key: string]: unknown;
}

export default function EditTransaction({ transaction, categories }: Props) {
    const [data, setData] = useState({
        date: transaction.date,
        name: transaction.name,
        description: transaction.description || '',
        category_id: transaction.category_id.toString(),
        amount: transaction.amount.toString(),
        type: transaction.type,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.put(`/transactions/${transaction.id}`, data, {
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
            onSuccess: () => {
                setProcessing(false);
            },
        });
    };

    const goBack = () => {
        router.get('/transactions');
    };

    return (
        <AppShell>
            <Head title="Edit Transaction" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={goBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">✏️ Edit Transaction</h1>
                        <p className="text-gray-600">Update your transaction details</p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Transaction Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Transaction Type
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="income"
                                        checked={data.type === 'income'}
                                        onChange={(e) => setData({ ...data, type: e.target.value as 'income' | 'expense' })}
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        📈 Income
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="expense"
                                        checked={data.type === 'expense'}
                                        onChange={(e) => setData({ ...data, type: e.target.value as 'income' | 'expense' })}
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        📉 Expense
                                    </span>
                                </label>
                            </div>
                            {errors.type && (
                                <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date */}
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={data.date}
                                    onChange={(e) => setData({ ...data, date: e.target.value })}
                                    className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                        errors.date ? 'border-red-300' : ''
                                    }`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                                )}
                            </div>

                            {/* Amount */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="amount"
                                        step="0.01"
                                        min="0"
                                        value={data.amount}
                                        onChange={(e) => setData({ ...data, amount: e.target.value })}
                                        placeholder="0.00"
                                        className={`pl-7 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                            errors.amount ? 'border-red-300' : ''
                                        }`}
                                    />
                                </div>
                                {errors.amount && (
                                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                                )}
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Transaction Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                placeholder="e.g., Grocery shopping, Salary payment..."
                                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                    errors.name ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) => setData({ ...data, category_id: e.target.value })}
                                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                    errors.category_id ? 'border-red-300' : ''
                                }`}
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                placeholder="Add any additional details about this transaction..."
                                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                    errors.description ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={goBack}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={processing}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Updating...' : 'Update Transaction'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}