/*
  Warnings:

  - You are about to drop the column `refId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Version` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refVersionId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_refId_fkey";

-- AlterTable
ALTER TABLE "audit"."Version" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "refId",
ADD COLUMN     "refVersionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_refVersionId_fkey" FOREIGN KEY ("refVersionId") REFERENCES "audit"."Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
