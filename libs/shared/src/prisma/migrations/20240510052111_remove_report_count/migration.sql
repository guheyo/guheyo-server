/*
  Warnings:

  - You are about to drop the column `reportCommentCount` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `reportCount` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "reportCommentCount",
DROP COLUMN "reportCount";
