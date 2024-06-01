/*
  Warnings:

  - You are about to drop the column `extensionCount` on the `Auction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Auction" DROP COLUMN "extensionCount",
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;
