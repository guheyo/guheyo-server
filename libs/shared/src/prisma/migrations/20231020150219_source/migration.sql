/*
  Warnings:

  - Added the required column `source` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `AuctionComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `PostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Swap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `UserImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AuctionComment" ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostComment" ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Swap" ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserImage" ADD COLUMN     "source" TEXT NOT NULL;
