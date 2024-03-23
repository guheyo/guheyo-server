-- Audit trigger function
CREATE OR REPLACE FUNCTION "audit"."audit_trail"() RETURNS TRIGGER AS $$
    BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO "audit"."Version"
            VALUES (DEFAULT, now(), NULL, TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, OLD."id", to_jsonb(OLD));
            RETURN OLD;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO "audit"."Version"
            VALUES (DEFAULT, now(), NULL, TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, NEW."id", to_jsonb(NEW));
            RETURN NEW;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO "audit"."Version"
            VALUES (DEFAULT, now(), NULL, TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, NEW."id", to_jsonb(NEW));
            RETURN NEW;
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

-- Audit trigger on Offer
CREATE TRIGGER audit_offer
AFTER INSERT OR UPDATE OR DELETE ON "public"."Offer"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on Demand
CREATE TRIGGER audit_demand
AFTER INSERT OR UPDATE OR DELETE ON "public"."Demand"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on Swap
CREATE TRIGGER audit_swap
AFTER INSERT OR UPDATE OR DELETE ON "public"."Swap"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on Auction
CREATE TRIGGER audit_auction
AFTER INSERT OR UPDATE OR DELETE ON "public"."Auction"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on Post
CREATE TRIGGER audit_post
AFTER INSERT OR UPDATE OR DELETE ON "public"."Post"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on Comment
CREATE TRIGGER audit_comment
AFTER INSERT OR UPDATE OR DELETE ON "public"."Comment"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();

-- Audit trigger on Term
CREATE TRIGGER audit_term
AFTER INSERT OR UPDATE OR DELETE ON "public"."Term"
    FOR EACH ROW EXECUTE FUNCTION "audit"."audit_trail"();
