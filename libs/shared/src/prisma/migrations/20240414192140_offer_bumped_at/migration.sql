/*
  Warnings:

  - Made the column `bumpedAt` on table `Offer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Offer" ALTER COLUMN "bumpedAt" SET NOT NULL,
ALTER COLUMN "bumpedAt" SET DEFAULT CURRENT_TIMESTAMP;
