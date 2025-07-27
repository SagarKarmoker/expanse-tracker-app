import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from '@workos-inc/authkit-nextjs';

// GET /api/v1/expense - Get all expenses for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const expenses = await prisma.expense.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/v1/expense - Create a new expense
export async function POST(req: NextRequest) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, amount, date, category, description } = body;

    // Validate required fields
    if (!name || !amount || !date || !category) {
      return NextResponse.json(
        { error: "Missing required fields: name, amount, date, category" },
        { status: 400 }
      );
    }

    // Validate amount is positive
    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be positive" },
        { status: 400 }
      );
    }

    // Validate category is valid
    const validCategories = ['FOOD', 'TRANSPORT', 'ENTERTAINMENT', 'HOUSING', 'SHOPPING', 'HEALTH', 'UTILITIES', 'OTHER'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.create({
      data: {
        userId: user.id,
        name: name,
        amount: Math.round(amount * 100), // Convert to cents for precision
        date: new Date(date),
        category: category as 'FOOD' | 'TRANSPORT' | 'ENTERTAINMENT' | 'HOUSING' | 'SHOPPING' | 'HEALTH' | 'UTILITIES' | 'OTHER',
        description: description || null,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/v1/expense - Update an existing expense
export async function PUT(req: NextRequest) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, name, amount, date, category, description } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Expense ID is required" },
        { status: 400 }
      );
    }

    // Check if expense exists and belongs to user
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existingExpense) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    const updateData: {
      name?: string;
      amount?: number;
      date?: Date;
      category?: 'FOOD' | 'TRANSPORT' | 'ENTERTAINMENT' | 'HOUSING' | 'SHOPPING' | 'HEALTH' | 'UTILITIES' | 'OTHER';
      description?: string | null;
    } = {};

    if (name !== undefined) updateData.name = name;
    if (amount !== undefined) {
      if (amount <= 0) {
        return NextResponse.json(
          { error: "Amount must be positive" },
          { status: 400 }
        );
      }
      updateData.amount = Math.round(amount * 100);
    }
    if (date !== undefined) updateData.date = new Date(date);
    if (category !== undefined) {
      const validCategories = ['FOOD', 'TRANSPORT', 'ENTERTAINMENT', 'HOUSING', 'SHOPPING', 'HEALTH', 'UTILITIES', 'OTHER'];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: "Invalid category" },
          { status: 400 }
        );
      }
      updateData.category = category as 'FOOD' | 'TRANSPORT' | 'ENTERTAINMENT' | 'HOUSING' | 'SHOPPING' | 'HEALTH' | 'UTILITIES' | 'OTHER';
    }
    if (description !== undefined) updateData.description = description;

    const updatedExpense = await prisma.expense.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/v1/expense - Delete an expense
export async function DELETE(req: NextRequest) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Expense ID is required" },
        { status: 400 }
      );
    }

    // Check if expense exists and belongs to user
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existingExpense) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    await prisma.expense.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}