/*
  Warnings:

  - You are about to drop the column `system` on the `DiscordMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "DiscordMessage" DROP COLUMN "system",
ADD COLUMN     "bot" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Guild" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "PostCategory" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Swap" ADD COLUMN     "slug" TEXT;
