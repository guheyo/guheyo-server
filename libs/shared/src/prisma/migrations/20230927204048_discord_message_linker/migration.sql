/*
  Warnings:

  - You are about to drop the column `marketId` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `communityId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `communityId` on the `PostCategory` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `Swap` table. All the data in the column will be lost.
  - You are about to drop the `Community` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscordChannelLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscordMarketChannelLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscordMessageLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Market` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `guildId` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `PostCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `Swap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Demand" DROP CONSTRAINT "Demand_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_communityId_fkey";

-- DropForeignKey
ALTER TABLE "PostCategory" DROP CONSTRAINT "PostCategory_communityId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Swap" DROP CONSTRAINT "Swap_marketId_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "marketId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "marketId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "marketId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "communityId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostCategory" DROP COLUMN "communityId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "marketId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Swap" DROP COLUMN "marketId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Community";

-- DropTable
DROP TABLE "DiscordChannelLink";

-- DropTable
DROP TABLE "DiscordMarketChannelLink";

-- DropTable
DROP TABLE "DiscordMessageLink";

-- DropTable
DROP TABLE "Market";

-- CreateTable
CREATE TABLE "DiscordMessageLinker" (
    "discordMessageId" TEXT NOT NULL,
    "discordChannelId" TEXT NOT NULL,
    "discordGuildId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "modelName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordMessageLinker_discordMessageId_key" ON "DiscordMessageLinker"("discordMessageId");

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swap" ADD CONSTRAINT "Swap_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
