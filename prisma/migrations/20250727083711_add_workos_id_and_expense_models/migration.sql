/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workosId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('FOOD', 'TRANSPORT', 'ENTERTAINMENT', 'HOUSING', 'SHOPPING', 'HEALTH', 'UTILITIES', 'OTHER');

-- AlterTable
-- First, add workosId as nullable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "workosId" TEXT;

-- Update existing users with a temporary workosId (you may want to update these with actual WorkOS IDs later)
UPDATE "User" SET "workosId" = 'temp_' || "id" WHERE "workosId" IS NULL;

-- Now make workosId required
ALTER TABLE "User" ALTER COLUMN "workosId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" "ExpenseCategory" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_workosId_key" ON "User"("workosId");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("workosId") ON DELETE RESTRICT ON UPDATE CASCADE;
