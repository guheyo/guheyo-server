/*
  Warnings:

  - Added the required column `refId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Report" ADD COLUMN     "refId" TEXT NOT NULL;
