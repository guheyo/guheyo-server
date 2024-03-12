/*
  Warnings:

  - You are about to drop the column `newData` on the `DemandBump` table. All the data in the column will be lost.
  - You are about to drop the column `oldData` on the `DemandBump` table. All the data in the column will be lost.
  - You are about to drop the column `newData` on the `OfferBump` table. All the data in the column will be lost.
  - You are about to drop the column `oldData` on the `OfferBump` table. All the data in the column will be lost.
  - You are about to drop the column `newData` on the `SwapBump` table. All the data in the column will be lost.
  - You are about to drop the column `oldData` on the `SwapBump` table. All the data in the column will be lost.
  - Added the required column `newPrice` to the `DemandBump` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldPrice` to the `DemandBump` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newPrice` to the `OfferBump` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldPrice` to the `OfferBump` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newPrice` to the `SwapBump` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldPrice` to the `SwapBump` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DemandBump" DROP COLUMN "newData",
DROP COLUMN "oldData",
ADD COLUMN     "newPrice" INTEGER NOT NULL,
ADD COLUMN     "oldPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OfferBump" DROP COLUMN "newData",
DROP COLUMN "oldData",
ADD COLUMN     "newPrice" INTEGER NOT NULL,
ADD COLUMN     "oldPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SwapBump" DROP COLUMN "newData",
DROP COLUMN "oldData",
ADD COLUMN     "newPrice" INTEGER NOT NULL,
ADD COLUMN     "oldPrice" INTEGER NOT NULL;
