/*
  Warnings:

  - You are about to drop the column `businessFunction` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `endedAt` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `bidderId` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Bump` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `UserImage` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedPostId` on the `UserReview` table. All the data in the column will be lost.
  - You are about to drop the `Demand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Swap` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `extendedEndDate` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalEndDate` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerId` to the `Bump` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Bid" DROP CONSTRAINT "Bid_bidderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bump" DROP CONSTRAINT "Bump_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Demand" DROP CONSTRAINT "Demand_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Swap" DROP CONSTRAINT "Swap_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserReview" DROP CONSTRAINT "UserReview_reviewedPostId_fkey";

-- AlterTable
ALTER TABLE "public"."Auction" DROP COLUMN "businessFunction",
DROP COLUMN "endedAt",
ADD COLUMN     "extendedEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "extensionCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hammerPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "originalEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Bid" DROP COLUMN "bidderId",
DROP COLUMN "source",
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Bump" DROP COLUMN "postId",
ADD COLUMN     "offerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Comment" DROP COLUMN "source",
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "public"."Offer" ADD COLUMN     "bumpedAt" TIMESTAMP(3),
ADD COLUMN     "name0" TEXT,
ADD COLUMN     "name1" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "source",
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "userAgent" TEXT,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Report" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserImage" DROP COLUMN "source";

-- AlterTable
ALTER TABLE "public"."UserReview" DROP COLUMN "reviewedPostId",
ADD COLUMN     "auctionId" TEXT,
ADD COLUMN     "offerId" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Demand";

-- DropTable
DROP TABLE "public"."Swap";

-- AddForeignKey
ALTER TABLE "public"."Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bump" ADD CONSTRAINT "Bump_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "public"."Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserReview" ADD CONSTRAINT "UserReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserReview" ADD CONSTRAINT "UserReview_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "public"."Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserReview" ADD CONSTRAINT "UserReview_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "public"."Auction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Auction" ADD CONSTRAINT "Auction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bid" ADD CONSTRAINT "Bid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
