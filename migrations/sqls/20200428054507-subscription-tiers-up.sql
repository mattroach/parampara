CREATE TYPE subscription_tier AS ENUM ('free', 'pro');

ALTER TABLE "admin" ADD COLUMN subscription_tier subscription_tier NOT NULL DEFAULT 'free';