-- Previous audit triggers

-- -- Audit trigger on Offer
-- CREATE TRIGGER audit_offer
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Offer"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Demand
-- CREATE TRIGGER audit_demand
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Demand"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Swap
-- CREATE TRIGGER audit_swap
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Swap"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Auction
-- CREATE TRIGGER audit_auction
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Auction"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Post
-- CREATE TRIGGER audit_post
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Post"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Comment
-- CREATE TRIGGER audit_comment
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Comment"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- -- Audit trigger on Term
-- CREATE TRIGGER audit_term
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."Term"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on User
-- CREATE TRIGGER audit_user
-- AFTER INSERT OR UPDATE OR DELETE ON "public"."User"
--     FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on DealReview
CREATE TRIGGER audit_dealReview
AFTER INSERT OR UPDATE OR DELETE ON "public"."DealReview"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();
