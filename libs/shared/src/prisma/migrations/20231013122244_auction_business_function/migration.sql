/*
  Warnings:

  - Added the required column `businessFunction` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "businessFunction" TEXT NOT NULL;
