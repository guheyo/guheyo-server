/*
  Warnings:

  - You are about to drop the column `new` on the `DemandBump` table. All the data in the column will be lost.
  - You are about to drop the column `old` on the `DemandBump` table. All the data in the column will be lost.
  - You are about to drop the column `new` on the `OfferBump` table. All the data in the column will be lost.
  - You are about to drop the column `old` on the `OfferBump` table. All the data in the column will be lost.
  - You are about to drop the column `new` on the `SwapBump` table. All the data in the column will be lost.
  - You are about to drop the column `old` on the `SwapBump` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DemandBump" DROP COLUMN "new",
DROP COLUMN "old",
ADD COLUMN     "newData" JSONB,
ADD COLUMN     "oldData" JSONB;

-- AlterTable
ALTER TABLE "OfferBump" DROP COLUMN "new",
DROP COLUMN "old",
ADD COLUMN     "newData" JSONB,
ADD COLUMN     "oldData" JSONB;

-- AlterTable
ALTER TABLE "SwapBump" DROP COLUMN "new",
DROP COLUMN "old",
ADD COLUMN     "newData" JSONB,
ADD COLUMN     "oldData" JSONB;
