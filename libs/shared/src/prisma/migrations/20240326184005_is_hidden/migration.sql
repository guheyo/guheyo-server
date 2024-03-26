/*
  Warnings:

  - You are about to drop the column `hidden` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `hidden` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `hidden` on the `Swap` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Demand" DROP COLUMN "hidden",
ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Offer" DROP COLUMN "hidden",
ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Swap" DROP COLUMN "hidden",
ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;
