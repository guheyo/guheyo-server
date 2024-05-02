/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MemberToRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_groupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Role" DROP CONSTRAINT "Role_groupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MemberToRole" DROP CONSTRAINT "_MemberToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MemberToRole" DROP CONSTRAINT "_MemberToRole_B_fkey";

-- AlterTable
ALTER TABLE "public"."Reaction" ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "public"."Role" ALTER COLUMN "groupId" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Member";

-- DropTable
DROP TABLE "public"."_MemberToRole";

-- CreateTable
CREATE TABLE "public"."_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "public"."_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "public"."_RoleToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."Role" ADD CONSTRAINT "Role_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
