/*
  Warnings:

  - You are about to drop the `DemandBump` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DemandReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OfferBump` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OfferReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SwapBump` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SwapReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DemandBump" DROP CONSTRAINT "DemandBump_demandId_fkey";

-- DropForeignKey
ALTER TABLE "DemandReport" DROP CONSTRAINT "DemandReport_demandId_fkey";

-- DropForeignKey
ALTER TABLE "DemandReport" DROP CONSTRAINT "DemandReport_authorId_fkey";

-- DropForeignKey
ALTER TABLE "OfferBump" DROP CONSTRAINT "OfferBump_offerId_fkey";

-- DropForeignKey
ALTER TABLE "OfferReport" DROP CONSTRAINT "OfferReport_offerId_fkey";

-- DropForeignKey
ALTER TABLE "OfferReport" DROP CONSTRAINT "OfferReport_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SwapBump" DROP CONSTRAINT "SwapBump_swapId_fkey";

-- DropForeignKey
ALTER TABLE "SwapReport" DROP CONSTRAINT "SwapReport_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SwapReport" DROP CONSTRAINT "SwapReport_swapId_fkey";

-- DropTable
DROP TABLE "DemandBump";

-- DropTable
DROP TABLE "DemandReport";

-- DropTable
DROP TABLE "OfferBump";

-- DropTable
DROP TABLE "OfferReport";

-- DropTable
DROP TABLE "SwapBump";

-- DropTable
DROP TABLE "SwapReport";

-- CreateTable
CREATE TABLE "Bump" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "offerId" TEXT,
    "demandId" TEXT,
    "swapId" TEXT,
    "oldPrice" INTEGER NOT NULL,
    "newPrice" INTEGER NOT NULL,

    CONSTRAINT "Bump_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "offerId" TEXT,
    "demandId" TEXT,
    "swapId" TEXT,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bump" ADD CONSTRAINT "Bump_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bump" ADD CONSTRAINT "Bump_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bump" ADD CONSTRAINT "Bump_swapId_fkey" FOREIGN KEY ("swapId") REFERENCES "Swap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_swapId_fkey" FOREIGN KEY ("swapId") REFERENCES "Swap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
