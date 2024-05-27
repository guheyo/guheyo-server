/*
  Warnings:

  - You are about to drop the column `currentBidPrice` on the `Auction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Auction" DROP COLUMN "currentBidPrice";
