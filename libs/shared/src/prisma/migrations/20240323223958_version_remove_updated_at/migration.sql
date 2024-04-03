/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Version` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "audit"."Version" DROP COLUMN "updatedAt";
