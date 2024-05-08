/*
  Warnings:

  - Made the column `postId` on table `Reaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Reaction" DROP CONSTRAINT "Reaction_postId_fkey";

-- AlterTable
ALTER TABLE "public"."Reaction" ALTER COLUMN "postId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Reaction" ADD CONSTRAINT "Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
