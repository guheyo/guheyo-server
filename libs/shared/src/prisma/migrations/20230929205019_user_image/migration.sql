/*
  Warnings:

  - You are about to drop the column `brand0Id` on the `Swap` table. All the data in the column will be lost.
  - You are about to drop the column `brand1Id` on the `Swap` table. All the data in the column will be lost.
  - You are about to drop the column `productCategory0Id` on the `Swap` table. All the data in the column will be lost.
  - You are about to drop the column `productCategory1Id` on the `Swap` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AuctionImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DemandImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OfferImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SwapImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productCategoryId` to the `Swap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuctionImage" DROP CONSTRAINT "AuctionImage_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "DemandImage" DROP CONSTRAINT "DemandImage_demandId_fkey";

-- DropForeignKey
ALTER TABLE "OfferImage" DROP CONSTRAINT "OfferImage_offerId_fkey";

-- DropForeignKey
ALTER TABLE "PostImage" DROP CONSTRAINT "PostImage_postId_fkey";

-- DropForeignKey
ALTER TABLE "Swap" DROP CONSTRAINT "Swap_brand0Id_fkey";

-- DropForeignKey
ALTER TABLE "Swap" DROP CONSTRAINT "Swap_brand1Id_fkey";

-- DropForeignKey
ALTER TABLE "Swap" DROP CONSTRAINT "Swap_productCategory0Id_fkey";

-- DropForeignKey
ALTER TABLE "Swap" DROP CONSTRAINT "Swap_productCategory1Id_fkey";

-- DropForeignKey
ALTER TABLE "SwapImage" DROP CONSTRAINT "SwapImage_swapId_fkey";

-- AlterTable
ALTER TABLE "Swap" DROP COLUMN "brand0Id",
DROP COLUMN "brand1Id",
DROP COLUMN "productCategory0Id",
DROP COLUMN "productCategory1Id",
ADD COLUMN     "brandId" TEXT,
ADD COLUMN     "productCategoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- DropTable
DROP TABLE "AuctionImage";

-- DropTable
DROP TABLE "DemandImage";

-- DropTable
DROP TABLE "OfferImage";

-- DropTable
DROP TABLE "PostImage";

-- DropTable
DROP TABLE "SwapImage";

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "tracked" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swap" ADD CONSTRAINT "Swap_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swap" ADD CONSTRAINT "Swap_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
