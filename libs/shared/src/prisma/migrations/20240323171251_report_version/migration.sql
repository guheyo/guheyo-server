/*
  Warnings:

  - You are about to drop the column `demandId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `offerId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `swapId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `refId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_demandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_offerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_swapId_fkey";

-- AlterTable
ALTER TABLE "public"."Demand" ADD COLUMN     "reportCommentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reportCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Offer" ADD COLUMN     "reportCommentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reportCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "demandId",
DROP COLUMN "offerId",
DROP COLUMN "swapId",
ADD COLUMN     "refId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Swap" ADD COLUMN     "reportCommentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reportCount" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_refId_fkey" FOREIGN KEY ("refId") REFERENCES "audit"."Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;