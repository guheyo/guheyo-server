-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "shippingCost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shippingType" TEXT NOT NULL DEFAULT 'free';

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "shippingCost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shippingType" TEXT NOT NULL DEFAULT 'free';

-- AlterTable
ALTER TABLE "Swap" ADD COLUMN     "shippingCost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shippingType" TEXT NOT NULL DEFAULT 'free';
