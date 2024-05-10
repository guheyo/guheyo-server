/*
  Warnings:

  - Made the column `postId` on table `Auction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Auction" DROP CONSTRAINT "Auction_postId_fkey";

-- AlterTable
ALTER TABLE "public"."Auction" ALTER COLUMN "postId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Auction" ADD CONSTRAINT "Auction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
