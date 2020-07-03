
ALTER TABLE session_response ALTER COLUMN response_type TYPE VARCHAR(255);

DROP TYPE IF EXISTS response_type;
CREATE TYPE response_type AS ENUM ('ChooseResponse', 'MultiSelect', 'Comment', 'CollectEmail');

ALTER TABLE session_response ALTER COLUMN response_type TYPE response_type USING (response_type::response_type);

