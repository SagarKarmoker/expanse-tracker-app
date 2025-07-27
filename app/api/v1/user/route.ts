import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@workos-inc/authkit-nextjs";

// GET /api/v1/user - Get user information
export async function GET() {
  try {
    const { user: authUser } = await withAuth();

    if (!authUser || !authUser.id) {
      return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
      id: authUser.id,
      },
      select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 