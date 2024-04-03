/*
  Warnings:

  - You are about to drop the `_GuildToRole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[guildId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guildId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GuildToRole" DROP CONSTRAINT "_GuildToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_GuildToRole" DROP CONSTRAINT "_GuildToRole_B_fkey";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "guildId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_GuildToRole";

-- CreateIndex
CREATE UNIQUE INDEX "Role_guildId_key" ON "Role"("guildId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
