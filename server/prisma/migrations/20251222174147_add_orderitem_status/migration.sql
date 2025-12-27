/*
  Warnings:

  - Added the required column `sellerId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('PENDING', 'PACKED', 'SHIPPED', 'CANCELLED');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "status" "OrderItemStatus" NOT NULL DEFAULT 'PENDING';
