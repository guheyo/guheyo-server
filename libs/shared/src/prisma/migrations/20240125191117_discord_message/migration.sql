/*
  Warnings:

  - You are about to drop the column `guildId` on the `DiscordMessage` table. All the data in the column will be lost.
  - The required column `id` was added to the `DiscordMessage` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `DiscordMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordMessage" DROP COLUMN "guildId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "DiscordMessage_pkey" PRIMARY KEY ("id");
