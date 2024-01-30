/*
  Warnings:

  - You are about to drop the column `guildId` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `PostCategory` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `Swap` table. All the data in the column will be lost.
  - You are about to drop the `Guild` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BrandToGuild` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `PostCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Swap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Demand" DROP CONSTRAINT "Demand_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_guildId_fkey";

-- DropForeignKey
ALTER TABLE "PostCategory" DROP CONSTRAINT "PostCategory_guildId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Swap" DROP CONSTRAINT "Swap_guildId_fkey";

-- DropForeignKey
ALTER TABLE "_BrandToGuild" DROP CONSTRAINT "_BrandToGuild_A_fkey";

-- DropForeignKey
ALTER TABLE "_BrandToGuild" DROP CONSTRAINT "_BrandToGuild_B_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostCategory" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL,
ALTER COLUMN "hexColor" SET DEFAULT '#7f838e';

-- AlterTable
ALTER TABLE "Swap" DROP COLUMN "guildId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Guild";

-- DropTable
DROP TABLE "_BrandToGuild";

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BrandToGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BrandToGroup_AB_unique" ON "_BrandToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_BrandToGroup_B_index" ON "_BrandToGroup"("B");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swap" ADD CONSTRAINT "Swap_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrandToGroup" ADD CONSTRAINT "_BrandToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrandToGroup" ADD CONSTRAINT "_BrandToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
