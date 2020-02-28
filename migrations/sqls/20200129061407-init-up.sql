/* Replace with your SQL commands */
CREATE TABLE "admin" (
  id uuid PRIMARY KEY NOT NULL,
  created timestamp NOT NULL DEFAULT now(),
  email varchar(100) UNIQUE NOT NULL
);

CREATE TABLE script (
  id uuid PRIMARY KEY NOT NULL,
  admin_id uuid NOT NULL REFERENCES "admin"(id),
  title varchar(100) NOT NULL DEFAULT '',
  created timestamp DEFAULT now(),
  allow_anon boolean DEFAULT TRUE,
  reporting_email varchar(100),
  has_unpublished_changes boolean DEFAULT TRUE
);

CREATE TABLE script_version (
  id uuid PRIMARY KEY NOT NULL,
  script_id uuid NOT NULL REFERENCES script(id) ON DELETE CASCADE,
  version integer NOT NULL,
  created timestamp NOT NULL DEFAULT now(),
  items text NOT NULL default '[]',
  unique (script_id, version)
);

-- Only contains non-anon users.
CREATE TABLE "session_user" (
  id uuid PRIMARY KEY NOT NULL,
  created timestamp NOT NULL DEFAULT now(),
  email varchar(100) UNIQUE NOT NULL
);

CREATE TABLE session_progress (
  id uuid PRIMARY KEY NOT NULL,
  session_user_id uuid REFERENCES "session_user"(id),
  script_id uuid NOT NULL REFERENCES script(id) ON DELETE CASCADE,
  script_version_id uuid NOT NULL REFERENCES script_version(id),
  created timestamp NOT NULL DEFAULT now(),
  current_item_id integer NOT NULL default 0,
  progress integer NOT NULL default 0,
  duration_sec integer NOT NULL default 0,
  items text NOT NULL default '[]',
  referrer_code text 
);

CREATE TYPE response_type AS ENUM ('ChooseResponse', 'Comment');

CREATE TABLE session_response (
  id uuid PRIMARY KEY NOT NULL,
  session_progress_id uuid NOT NULL REFERENCES "session_progress"(id),
  session_user_id uuid REFERENCES "session_user"(id),
  script_id uuid NOT NULL REFERENCES script(id) ON DELETE CASCADE,
  created timestamp NOT NULL DEFAULT now(),
  response_type response_type NOT NULL,
  message text NOT NULL,
  response text NOT NULL
);