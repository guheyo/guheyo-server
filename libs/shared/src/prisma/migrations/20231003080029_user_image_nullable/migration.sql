-- AlterTable
ALTER TABLE "Auction" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Demand" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Offer" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Swap" ALTER COLUMN "description0" DROP NOT NULL,
ALTER COLUMN "description1" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserImage" ADD COLUMN     "contentType" TEXT,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "width" DROP NOT NULL;
