/*
  Warnings:

  - Added the required column `guildId` to the `DiscordMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordMessage" ADD COLUMN     "guildId" TEXT NOT NULL;
