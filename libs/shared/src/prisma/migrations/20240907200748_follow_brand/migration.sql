/*
  Warnings:

  - You are about to drop the column `position` on the `Brand` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Brand" DROP COLUMN "position";

-- CreateTable
CREATE TABLE "public"."FollowBrand" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "FollowBrand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowBrand_userId_brandId_key" ON "public"."FollowBrand"("userId", "brandId");

-- AddForeignKey
ALTER TABLE "public"."FollowBrand" ADD CONSTRAINT "FollowBrand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FollowBrand" ADD CONSTRAINT "FollowBrand_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
