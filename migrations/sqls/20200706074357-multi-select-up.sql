
ALTER TABLE session_response ALTER COLUMN response_type TYPE VARCHAR(255);

UPDATE session_response SET response_type='MultiSelect' WHERE response_type='MultiChoice';

DROP TYPE IF EXISTS response_type;
CREATE TYPE response_type AS ENUM ('ChooseResponse', 'MultiSelect', 'Comment', 'CollectEmail');

ALTER TABLE session_response ALTER COLUMN response_type TYPE response_type USING (response_type::response_type);

