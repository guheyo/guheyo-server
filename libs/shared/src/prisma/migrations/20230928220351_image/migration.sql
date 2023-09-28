/*
  Warnings:

  - You are about to drop the column `product` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `PostCategory` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `product0` on the `Swap` table. All the data in the column will be lost.
  - You are about to drop the column `product1` on the `Swap` table. All the data in the column will be lost.
  - Added the required column `description` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `PostCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description0` to the `Swap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description1` to the `Swap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name0` to the `Swap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name1` to the `Swap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "product",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "rank",
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "price",
DROP COLUMN "product",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "rank",
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "product",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "PostCategory" DROP COLUMN "rank",
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "rank",
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "rank",
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Swap" DROP COLUMN "product0",
DROP COLUMN "product1",
ADD COLUMN     "description0" TEXT NOT NULL,
ADD COLUMN     "description1" TEXT NOT NULL,
ADD COLUMN     "name0" TEXT NOT NULL,
ADD COLUMN     "name1" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PostImage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferImage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "offerId" TEXT NOT NULL,

    CONSTRAINT "OfferImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemandImage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "demandId" TEXT NOT NULL,

    CONSTRAINT "DemandImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SwapImage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "target" INTEGER NOT NULL,
    "swapId" TEXT NOT NULL,

    CONSTRAINT "SwapImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionImage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "AuctionImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferImage" ADD CONSTRAINT "OfferImage_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandImage" ADD CONSTRAINT "DemandImage_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwapImage" ADD CONSTRAINT "SwapImage_swapId_fkey" FOREIGN KEY ("swapId") REFERENCES "Swap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionImage" ADD CONSTRAINT "AuctionImage_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
