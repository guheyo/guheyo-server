-- CreateTable
CREATE TABLE "audit"."Version" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "schemaName" TEXT NOT NULL,
    "tableName" TEXT NOT NULL,
    "op" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "values" JSONB NOT NULL,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);
