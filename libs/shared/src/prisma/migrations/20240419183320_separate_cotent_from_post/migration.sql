/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Auction" ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "public"."Offer" ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "content";

-- AlterTable
ALTER TABLE "public"."UserReview" ADD COLUMN     "content" TEXT;
