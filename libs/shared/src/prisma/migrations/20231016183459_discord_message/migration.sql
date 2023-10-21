/*
  Warnings:

  - You are about to drop the `DiscordMessageLinker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DiscordMessageLinker";

-- CreateTable
CREATE TABLE "DiscordMessage" (
    "discordMessageId" TEXT NOT NULL,
    "discordChannelId" TEXT NOT NULL,
    "discordGuildId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "modelName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordMessage_discordMessageId_key" ON "DiscordMessage"("discordMessageId");
