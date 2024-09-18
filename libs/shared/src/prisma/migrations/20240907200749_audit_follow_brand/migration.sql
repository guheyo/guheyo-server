-- Audit trigger function
CREATE OR REPLACE FUNCTION "audit"."audit_trail"() RETURNS TRIGGER AS $$
    DECLARE
        ID UUID := gen_random_uuid();
    BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO "audit"."Version"
            VALUES (ID, now(), NULL, TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, OLD."id", to_jsonb(OLD));
            RETURN OLD;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO "audit"."Version"
            VALUES (ID, now(), NULL, TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, NEW."id", to_jsonb(NEW));
            RETURN NEW;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO "audit"."Version"
            VALUES (ID, now(), NULL, TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, NEW."id", to_jsonb(NEW));
            RETURN NEW;
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

-- -- Audit trigger on Offer
-- CREATE TRIGGER audit_offer
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Offer"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Auction
-- CREATE TRIGGER audit_auction
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Auction"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Bid
-- CREATE TRIGGER audit_bid
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Bid"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Post
-- CREATE TRIGGER audit_post
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Post"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Comment
-- CREATE TRIGGER audit_comment
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Comment"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Report
-- CREATE TRIGGER audit_report
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Report"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on ReportComment
-- CREATE TRIGGER audit_report_comment
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."ReportComment"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on UserReview
-- CREATE TRIGGER audit_user_review
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."UserReview"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Term
-- CREATE TRIGGER audit_term
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Term"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on User
-- CREATE TRIGGER audit_user
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."User"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Group
-- CREATE TRIGGER audit_group
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Group"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Category
-- CREATE TRIGGER audit_category
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Category"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Tag
-- CREATE TRIGGER audit_tag
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Tag"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Reaction
-- CREATE TRIGGER audit_reaction
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Reaction"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Emoji
-- CREATE TRIGGER audit_emoji
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Emoji"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on Thread
-- CREATE TRIGGER audit_thread
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Thread"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Brand
-- CREATE TRIGGER audit_brand
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Brand"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Platform
-- CREATE TRIGGER audit_platform
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Platform"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Link
-- CREATE TRIGGER audit_link
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Link"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on FollowBrand
CREATE TRIGGER audit_follow_brand
AFTER INSERT OR UPDATE OR DELETE ON "public"."FollowBrand"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();
