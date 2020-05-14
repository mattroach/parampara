ALTER TABLE "admin" 
  ADD COLUMN auth0_id varchar(265) UNIQUE,
  ADD COLUMN display_name varchar(100),
  ADD COLUMN picture_url varchar(265);

UPDATE "admin" set display_name = email where 1=1;

ALTER TABLE "admin" ALTER COLUMN display_name SET NOT NULL;
ALTER TABLE "admin" DROP CONSTRAINT admin_email_key;