import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Palette } from 'lucide-react';



const colorOptions = [
    '#10B981', // Green
    '#F59E0B', // Orange
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#14B8A6', // Teal
    '#F97316', // Orange Alt
    '#6366F1', // Indigo
    '#EC4899', // Pink
    '#64748B', // Slate
];

export default function CreateCategory() {
    const [data, setData] = useState({
        name: '',
        color: '#3B82F6',
        description: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/categories', data, {
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
        router.get('/categories');
    };

    return (
        <AppShell>
            <Head title="Add Category" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={goBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🏷️ Add New Category</h1>
                        <p className="text-gray-600">Create a category to organize your transactions</p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Category Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Category Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                placeholder="e.g., Food & Dining, Transportation, Salary..."
                                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                    errors.name ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Color Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                <Palette className="w-4 h-4 inline mr-2" />
                                Category Color *
                            </label>
                            <div className="grid grid-cols-6 gap-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setData({ ...data, color })}
                                        className={`w-12 h-12 rounded-lg border-2 transition-all ${
                                            data.color === color 
                                                ? 'border-gray-900 scale-110' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        style={{ backgroundColor: color }}
                                    >
                                        {data.color === color && (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-2 flex items-center space-x-2">
                                <div 
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: data.color }}
                                ></div>
                                <span className="text-sm text-gray-600">
                                    Selected: {data.color.toUpperCase()}
                                </span>
                            </div>
                            {errors.color && (
                                <p className="mt-1 text-sm text-red-600">{errors.color}</p>
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
                                placeholder="Add a description to help identify this category..."
                                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                    errors.description ? 'border-red-300' : ''
                                }`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Preview */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                            <div className="flex items-center space-x-3">
                                <div 
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                                    style={{ backgroundColor: data.color }}
                                >
                                    {data.name.charAt(0).toUpperCase() || '?'}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {data.name || 'Category Name'}
                                    </div>
                                    {data.description && (
                                        <div className="text-sm text-gray-600">
                                            {data.description}
                                        </div>
                                    )}
                                </div>
                            </div>
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
                                {processing ? 'Creating...' : 'Create Category'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Helper Text */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-900 mb-2">💡 Category Guidelines</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Choose names that clearly describe the type of transactions</li>
                        <li>• Use colors to create visual distinction between categories</li>
                        <li>• Keep categories broad enough to group similar expenses</li>
                        <li>• Consider both income and expense categories (e.g., "Salary" vs "Food")</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}