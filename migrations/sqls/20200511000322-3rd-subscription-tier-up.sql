ALTER TABLE "admin" ALTER COLUMN subscription_tier TYPE VARCHAR(255), 
  ALTER COLUMN subscription_tier DROP DEFAULT;

DROP TYPE IF EXISTS subscription_tier;
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'pro2');

ALTER TABLE "admin" ALTER COLUMN subscription_tier TYPE subscription_tier USING (subscription_tier::subscription_tier), 
  ALTER COLUMN subscription_tier SET DEFAULT 'free';
