-- AlterTable
ALTER TABLE "public"."Auction" ADD COLUMN     "pending" TEXT;

-- AlterTable
ALTER TABLE "public"."Demand" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pending" TEXT;

-- AlterTable
ALTER TABLE "public"."Offer" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pending" TEXT;

-- AlterTable
ALTER TABLE "public"."Swap" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pending" TEXT;
