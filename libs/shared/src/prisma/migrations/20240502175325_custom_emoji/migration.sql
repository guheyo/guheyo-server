-- AlterTable
ALTER TABLE "public"."Emoji" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "isCustom" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Emoji" ADD CONSTRAINT "Emoji_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Emoji" ADD CONSTRAINT "Emoji_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
