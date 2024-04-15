/*
  Warnings:

  - You are about to drop the column `userId` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserReview` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Auction" DROP CONSTRAINT "Auction_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Offer" DROP CONSTRAINT "Offer_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserReview" DROP CONSTRAINT "UserReview_userId_fkey";

-- DropIndex
DROP INDEX "public"."Report_postId_key";

-- AlterTable
ALTER TABLE "public"."Auction" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."Offer" DROP COLUMN "type",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "postId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "public"."UserReview" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "public"."ReportComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,

    CONSTRAINT "ReportComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReportComment" ADD CONSTRAINT "ReportComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReportComment" ADD CONSTRAINT "ReportComment_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
