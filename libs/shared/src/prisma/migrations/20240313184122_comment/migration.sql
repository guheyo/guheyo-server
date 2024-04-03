/*
  Warnings:

  - You are about to drop the `AuctionComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuctionComment" DROP CONSTRAINT "AuctionComment_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "AuctionComment" DROP CONSTRAINT "AuctionComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "AuctionComment" DROP CONSTRAINT "AuctionComment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "ReportComment" DROP CONSTRAINT "ReportComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ReportComment" DROP CONSTRAINT "ReportComment_reportId_fkey";

-- DropTable
DROP TABLE "AuctionComment";

-- DropTable
DROP TABLE "PostComment";

-- DropTable
DROP TABLE "ReportComment";

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "type" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "postId" TEXT,
    "reportId" TEXT,
    "auctionId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
