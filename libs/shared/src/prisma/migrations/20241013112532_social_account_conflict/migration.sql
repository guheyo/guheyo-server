-- CreateTable
CREATE TABLE "public"."SocialAccountConflict" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "conflictReason" TEXT,
    "provider" TEXT NOT NULL,
    "socialId" TEXT NOT NULL,
    "newUserId" TEXT NOT NULL,
    "existingUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,

    CONSTRAINT "SocialAccountConflict_pkey" PRIMARY KEY ("id")
);
