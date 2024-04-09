/*
  Warnings:

  - Added the required column `rating` to the `DealReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DealReview" ADD COLUMN     "rating" INTEGER NOT NULL;
