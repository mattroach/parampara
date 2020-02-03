/* Replace with your SQL commands */
CREATE TABLE script (
  id uuid PRIMARY KEY NOT NULL,
  created timestamp DEFAULT now()
);

CREATE TABLE script_version (
  id uuid PRIMARY KEY NOT NULL,
  script_id uuid NOT NULL REFERENCES script(id),
  version integer NOT NULL,
  created timestamp NOT NULL DEFAULT now(),
  title varchar(100) NOT NULL,
  reporting_email varchar(100) NOT NULL,
  items text NOT NULL,
  allow_anon boolean DEFAULT TRUE
);

CREATE TABLE "session_user" (
  id uuid PRIMARY KEY NOT NULL,
  created timestamp NOT NULL DEFAULT now(),
  email varchar(100) UNIQUE NOT NULL
);

CREATE TABLE session_progress (
  id uuid PRIMARY KEY NOT NULL,
  session_user_id uuid REFERENCES "session_user"(id),
  script_id uuid NOT NULL REFERENCES script(id),
  created timestamp NOT NULL DEFAULT now(),
  current_item_id integer NOT NULL default 0,
  items text NOT NULL default '[]'
);

-- test data
INSERT INTO
  public.script (id)
VALUES
  ('f13a7adb-a202-48ae-a739-3b9c2e166a68' :: uuid) returning id;

INSERT INTO
  public.script_version (
    script_id,
    id,
    version,
    title,
    reporting_email,
    allow_anon,
    items
  )
VALUES
  (
    'f13a7adb-a202-48ae-a739-3b9c2e166a68' :: uuid,
    'b653c75e-2e5c-4d27-ac57-88ad8c82c926' :: uuid,
    1,
    'the title' :: character varying(100),
    'jonah@getparampara.com' :: character varying(100),
    FALSE,
    '[{"type":"Message","message":"Hello you!"},{"type":"Message","message":"Welcome to Parampara"},{"type":"Message","message":"Hows your day?"},{"type":"ChooseResponse","responses":[{"message":"Good"},{"message":"Bad","nextId":5}]},{"type":"Message","message":"Nice to hear!","nextId":6},{"type":"Message","message":"Sorry to hear that."},{"type":"Message","message":"I am emailing you a document. What do you think about that?"},{"type":"Comment"},{"type":"Message","message":"Good bye!"}]' :: text
  ) returning id;