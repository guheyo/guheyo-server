-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "dealReviewId" TEXT;

-- CreateTable
CREATE TABLE "public"."DealReview" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "type" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "refVersionId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "revieweeId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "DealReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MannerTag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPositive" BOOLEAN NOT NULL,

    CONSTRAINT "MannerTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_DealReviewToMannerTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DealReviewToMannerTag_AB_unique" ON "public"."_DealReviewToMannerTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DealReviewToMannerTag_B_index" ON "public"."_DealReviewToMannerTag"("B");

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_dealReviewId_fkey" FOREIGN KEY ("dealReviewId") REFERENCES "public"."DealReview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DealReview" ADD CONSTRAINT "DealReview_refVersionId_fkey" FOREIGN KEY ("refVersionId") REFERENCES "audit"."Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DealReview" ADD CONSTRAINT "DealReview_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DealReview" ADD CONSTRAINT "DealReview_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DealReview" ADD CONSTRAINT "DealReview_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DealReviewToMannerTag" ADD CONSTRAINT "_DealReviewToMannerTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."DealReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DealReviewToMannerTag" ADD CONSTRAINT "_DealReviewToMannerTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."MannerTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
