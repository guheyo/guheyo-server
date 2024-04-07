/*
  Warnings:

  - Added the required column `position` to the `MannerTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MannerTag" ADD COLUMN     "position" INTEGER NOT NULL;
