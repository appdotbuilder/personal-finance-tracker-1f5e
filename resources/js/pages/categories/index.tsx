import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    color: string;
    description?: string;
    transactions_count?: number;
}

interface Props {
    categories: Category[];
    [key: string]: unknown;
}

export default function CategoriesIndex({ categories }: Props) {
    const deleteCategory = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the category "${name}"? This will also delete all associated transactions.`)) {
            router.delete(`/categories/${id}`);
        }
    };

    return (
        <AppShell>
            <Head title="Categories" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🏷️ Transaction Categories</h1>
                        <p className="text-gray-600">
                            Organize your transactions with custom categories
                        </p>
                    </div>
                    <Link href="/categories/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Category
                        </Button>
                    </Link>
                </div>

                {/* Categories Grid */}
                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div 
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
                                            style={{ backgroundColor: category.color }}
                                        >
                                            <Tag className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                            {category.description && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {category.description}
                                                </p>
                                            )}
                                            <div className="flex items-center space-x-2 mt-2">
                                                <div 
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: category.color }}
                                                ></div>
                                                <span className="text-xs text-gray-500">
                                                    {category.color.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link href={`/categories/${category.id}/edit`}>
                                            <Button variant="ghost" size="sm">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => deleteCategory(category.id, category.name)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                        <div className="text-gray-400 text-4xl mb-4">🏷️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                        <p className="text-gray-500 mb-4">
                            Create your first category to start organizing your transactions.
                        </p>
                        <Link href="/categories/create">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Category
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Default Categories Suggestion */}
                {categories.length === 0 && (
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="font-medium text-blue-900 mb-3">💡 Suggested Categories</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-blue-800">Salary</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span className="text-blue-800">Food & Dining</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-800">Transportation</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-blue-800">Entertainment</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-blue-800">Shopping</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                <span className="text-blue-800">Healthcare</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                                <span className="text-blue-800">Utilities</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                                <span className="text-blue-800">Investment</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tips */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-medium text-yellow-900 mb-2">💡 Category Tips</h3>
                    <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Use clear, descriptive names for your categories</li>
                        <li>• Choose colors that help you quickly identify different types of expenses</li>
                        <li>• Keep the number of categories manageable (8-12 is usually enough)</li>
                        <li>• Group similar expenses together (e.g., "Food & Dining" instead of separate categories for restaurants and groceries)</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}