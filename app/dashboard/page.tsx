'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@workos-inc/authkit-nextjs/components'
import {
    Plus,
    DollarSign,
    Calendar,
    Tag,
    LogOut,
    User,
    Receipt,
    TrendingUp,
    MoreHorizontal,
    Save,
    X,
    Trash2,
    Edit
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import api from '@/lib/api'
import { Expense, CreateExpenseData } from '@/lib/types'

export default function Dashboard() {
    const { signOut, user } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [formData, setFormData] = useState<CreateExpenseData>({
        name: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        description: ''
    });

    // Fetch expenses on component mount
    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await api.get<Expense[]>('/expense');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = () => {
        setEditingExpense(null);
        setFormData({
            name: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            category: '',
            description: ''
        });
        setIsDialogOpen(true);
    };

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense(expense);
        setFormData({
            name: expense.name,
            amount: (expense.amount / 100).toString(),
            date: new Date(expense.date).toISOString().split('T')[0],
            category: expense.category,
            description: expense.description || ''
        });
        setIsDialogOpen(true);
    };

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            // Reset form when dialog closes
            setEditingExpense(null);
            setFormData({
                name: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                category: '',
                description: ''
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingExpense) {
                // Update existing expense
                await api.put('/expense', {
                    id: editingExpense.id,
                    ...formData
                });
            } else {
                // Create new expense
                await api.post('/expense', formData);
            }

            setIsDialogOpen(false);
            setEditingExpense(null);
            setFormData({
                name: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                category: '',
                description: ''
            });
            fetchExpenses(); // Refresh the list
        } catch (error) {
            console.error('Error saving expense:', error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || `Failed to ${editingExpense ? 'update' : 'create'} expense`;
                alert(errorMessage);
            } else {
                alert(`Failed to ${editingExpense ? 'update' : 'create'} expense`);
            }
        }
    };

    const handleDeleteExpense = async (id: string) => {
        if (!confirm('Are you sure you want to delete this expense?')) {
            return;
        }

        try {
            await api.delete(`/expense?id=${id}`);

            fetchExpenses(); // Refresh the list
        } catch (error) {
            console.error('Error deleting expense:', error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || 'Failed to delete expense';
                alert(errorMessage);
            } else {
                alert('Failed to delete expense');
            }
        }
    };

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount / 100, 0);
    const thisMonthExpenses = expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            const now = new Date();
            return expenseDate.getMonth() === now.getMonth() &&
                expenseDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum, expense) => sum + expense.amount / 100, 0);

    const todaysExpenses = expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            const today = new Date();
            return expenseDate.toDateString() === today.toDateString();
        })
        .reduce((sum, expense) => sum + expense.amount / 100, 0);

    const categoryCount = new Set(expenses.map(expense => expense.category)).size;

    // Group expenses by date
    const groupedExpenses = expenses.reduce((groups: { [key: string]: Expense[] }, expense) => {
        const date = new Date(expense.date).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(expense);
        return groups;
    }, {});

    // Sort dates in descending order (most recent first)
    const sortedDates = Object.keys(groupedExpenses).sort((a, b) => 
        new Date(b).getTime() - new Date(a).getTime()
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Receipt className="w-6 h-6 text-blue-600" />
                        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>Welcome, {user?.firstName || user?.email}</span>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => signOut()}
                            className="flex items-center space-x-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Expense Tracker Dashboard
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Welcome to your expense tracking dashboard. Here you can manage your expenses, view reports, and set budgets.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <DollarSign className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-blue-900">Total Expenses</h3>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">৳{totalExpenses.toFixed(2)}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Calendar className="w-5 h-5 text-green-600" />
                                    <h3 className="font-semibold text-green-900">This Month</h3>
                                </div>
                                <p className="text-2xl font-bold text-green-600">৳{thisMonthExpenses.toFixed(2)}</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <TrendingUp className="w-5 h-5 text-orange-600" />
                                    <h3 className="font-semibold text-orange-900">Today's Expenses</h3>
                                </div>
                                <p className="text-2xl font-bold text-orange-600">৳{todaysExpenses.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Expenses List */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Recent Expenses</h3>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Loading expenses...</p>
                            </div>
                        ) : expenses.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No expenses yet. Add your first expense!</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {sortedDates.map((dateString) => {
                                    const dateExpenses = groupedExpenses[dateString];
                                    const dayTotal = dateExpenses.reduce((sum, expense) => sum + expense.amount / 100, 0);
                                    const isToday = new Date(dateString).toDateString() === new Date().toDateString();
                                    const isYesterday = new Date(dateString).toDateString() === new Date(Date.now() - 86400000).toDateString();
                                    
                                    let displayDate = new Date(dateString).toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    });
                                    
                                    if (isToday) displayDate = "Today";
                                    else if (isYesterday) displayDate = "Yesterday";

                                    return (
                                        <div key={dateString} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-4 pb-2 border-b">
                                                <h4 className="font-semibold text-gray-900">{displayDate}</h4>
                                                <span className="text-sm font-medium text-gray-600">
                                                    Total: ৳{dayTotal.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="space-y-3">
                                                {dateExpenses.map((expense: Expense) => (
                                                    <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <DollarSign className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {expense.name} — ৳{(expense.amount / 100).toFixed(2)}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {expense.category}
                                                                </p>
                                                                {expense.description && (
                                                                    <p className="text-sm text-gray-400">{expense.description}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleEditExpense(expense)}
                                                                className="text-blue-600 hover:text-blue-700"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleDeleteExpense(expense.id)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add Expense Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex items-center space-x-2">
                            {editingExpense ? <Edit className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
                            <DialogTitle>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
                        </div>
                        <DialogDescription>
                            {editingExpense ? 'Update the details for your expense below.' : 'Enter the details for your new expense below.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                        <div className='relative'>
                            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    className="pl-10"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input
                                type="number"
                                placeholder="Amount"
                                className="pl-10"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input
                                type="date"
                                placeholder="Date"
                                className="pl-10"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Tag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <select
                                className="w-full border rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="FOOD">🍽️ Food</option>
                                <option value="TRANSPORT">🚗 Transport</option>
                                <option value="ENTERTAINMENT">🎮 Entertainment</option>
                                <option value="UTILITIES">⚡ Utilities</option>
                                <option value="SHOPPING">🛒 Shopping</option>
                                <option value="HEALTH">❤️ Health</option>
                                <option value="OTHER">📦 Other</option>
                            </select>
                        </div>
                        <div className="relative">
                            <MoreHorizontal className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Textarea
                                placeholder="Description (optional)"
                                className="pl-10"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div className="flex space-x-2 pt-2">
                            <Button
                                type="submit"
                                className="flex items-center space-x-2 flex-1"
                            >
                                <Save className="w-4 h-4" />
                                <span>{editingExpense ? 'Update Expense' : 'Add Expense'}</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="flex items-center space-x-2"
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={handleAddExpense}
                    className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                    size="icon"
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </div>
        </div>
    )
}
