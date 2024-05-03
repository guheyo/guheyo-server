/*
  Warnings:

  - You are about to drop the column `isCustom` on the `Emoji` table. All the data in the column will be lost.
  - Added the required column `position` to the `Emoji` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Emoji" DROP COLUMN "isCustom",
ADD COLUMN     "position" INTEGER NOT NULL;
