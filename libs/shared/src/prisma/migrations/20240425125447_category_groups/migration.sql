/*
  Warnings:

  - You are about to drop the column `groupId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_groupId_fkey";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "public"."_CategoryToGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToGroup_AB_unique" ON "public"."_CategoryToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToGroup_B_index" ON "public"."_CategoryToGroup"("B");

-- AddForeignKey
ALTER TABLE "public"."_CategoryToGroup" ADD CONSTRAINT "_CategoryToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoryToGroup" ADD CONSTRAINT "_CategoryToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
