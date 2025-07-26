'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@workos-inc/authkit-nextjs/components'
import { Plus } from 'lucide-react'
import React from 'react'

export default function Dashboard() {
    const { signOut, user } = useAuth();

    const handleAddExpense = () => {
        // TODO: Implement add expense functionality
        console.log('Add expense clicked');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            Welcome, {user?.firstName || user?.email}
                        </span>
                        <Button 
                            variant="outline" 
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>
            
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Expense Tracker Dashboard
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Welcome to your expense tracking dashboard. Here you can manage your expenses, view reports, and set budgets.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">Total Expenses</h3>
                                <p className="text-2xl font-bold text-blue-600">$0.00</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-900 mb-2">This Month</h3>
                                <p className="text-2xl font-bold text-green-600">$0.00</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-purple-900 mb-2">Categories</h3>
                                <p className="text-2xl font-bold text-purple-600">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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
