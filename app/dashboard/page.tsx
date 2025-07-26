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
    X
} from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Dashboard() {
    const { signOut, user } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddExpense = () => {
        setIsDialogOpen(true);
    };

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
    };

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
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-6">
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
                                <p className="text-2xl font-bold text-blue-600">$0.00</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Calendar className="w-5 h-5 text-green-600" />
                                    <h3 className="font-semibold text-green-900">This Month</h3>
                                </div>
                                <p className="text-2xl font-bold text-green-600">$0.00</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Tag className="w-5 h-5 text-purple-600" />
                                    <h3 className="font-semibold text-purple-900">Categories</h3>
                                </div>
                                <p className="text-2xl font-bold text-purple-600">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Expense Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex items-center space-x-2">
                            <Plus className="w-5 h-5 text-blue-600" />
                            <DialogTitle>Add New Expense</DialogTitle>
                        </div>
                        <DialogDescription>
                            Enter the details for your new expense below.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="relative">
                            <Receipt className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input 
                                type="text" 
                                placeholder="Expense Name" 
                                className="pl-10"
                            />
                        </div>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input 
                                type="number" 
                                placeholder="Amount" 
                                className="pl-10"
                            />
                        </div>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input
                                type="date"
                                placeholder="Date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                className="pl-10"
                            />
                        </div>
                        <div className="relative">
                            <Tag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <select className="w-full border rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="">
                                <option value="" disabled>
                                    Select Category
                                </option>
                                <option value="food">🍽️ Food</option>
                                <option value="transport">🚗 Transport</option>
                                <option value="entertainment">🎮 Entertainment</option>
                                <option value="utilities">⚡ Utilities</option>
                                <option value="shopping">🛒 Shopping</option>
                                <option value="health">❤️ Health</option>
                                <option value="other">📦 Other</option>
                            </select>
                        </div>
                        <div className="relative">
                            <MoreHorizontal className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Textarea 
                                placeholder="Description" 
                                className="pl-10"
                            />
                        </div>
                        <div className="flex space-x-2 pt-2">
                            <Button 
                                type="submit" 
                                className="flex items-center space-x-2 flex-1"
                            >
                                <Save className="w-4 h-4" />
                                <span>Add Expense</span>
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => setIsDialogOpen(false)}
                                className="flex items-center space-x-2"
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </div>
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
