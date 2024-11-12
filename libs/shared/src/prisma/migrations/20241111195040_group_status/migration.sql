-- CreateEnum
CREATE TYPE "public"."GroupStatus" AS ENUM ('MINOR', 'MAJOR');

-- AlterTable
ALTER TABLE "public"."Group" ADD COLUMN     "status" "public"."GroupStatus" NOT NULL DEFAULT 'MINOR';
