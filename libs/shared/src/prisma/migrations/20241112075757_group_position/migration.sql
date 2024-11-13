-- AlterTable
CREATE SEQUENCE "public".group_position_seq;
ALTER TABLE "public"."Group" ALTER COLUMN "position" SET DEFAULT nextval('"public".group_position_seq');
ALTER SEQUENCE "public".group_position_seq OWNED BY "public"."Group"."position";
