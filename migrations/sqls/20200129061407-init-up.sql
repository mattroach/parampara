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
  script_id uuid NOT NULL REFERENCES script(id),
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
  script_id uuid NOT NULL REFERENCES script(id),
  created timestamp NOT NULL DEFAULT now(),
  current_item_id integer NOT NULL default 0,
  items text NOT NULL default '[]'
);

CREATE TABLE session_response (
  id uuid PRIMARY KEY NOT NULL,
  session_progress_id uuid NOT NULL REFERENCES "session_progress"(id),
  session_user_id uuid REFERENCES "session_user"(id),
  script_id uuid NOT NULL REFERENCES script(id),
  script_version_id uuid NOT NULL REFERENCES script_version(id),
  item_index integer NOT NULL,
  created timestamp NOT NULL DEFAULT now(),
  choice_index integer NOT NULL,
  message text NOT NULL,
  response text NOT NULL
);

CREATE TABLE session_comment (
  id uuid PRIMARY KEY NOT NULL,
  session_progress_id uuid NOT NULL REFERENCES "session_progress"(id),
  session_user_id uuid REFERENCES "session_user"(id),
  script_id uuid NOT NULL REFERENCES script(id),
  script_version_id uuid NOT NULL REFERENCES script_version(id),
  item_index integer NOT NULL,
  created timestamp NOT NULL DEFAULT now(),
  message text NOT NULL,
  response text NOT NULL
);

-- test data
INSERT INTO
  public.admin (id, email)
VALUES
  (
    'a13a7adb-a202-48ae-a739-3b9c2e166a69' :: uuid,
    'jonah@getparampara.com'
  ) returning id;

INSERT INTO
  public.script (
    id,
    admin_id,
    title,
    reporting_email,
    allow_anon
  )
VALUES
  (
    'f13a7adb-a202-48ae-a739-3b9c2e166a68' :: uuid,
    'a13a7adb-a202-48ae-a739-3b9c2e166a69' :: uuid,
    'My script',
    'jonah@getparampara.com' :: character varying(100),
    TRUE
  ) returning id;

INSERT INTO
  public.script_version (
    script_id,
    id,
    version,
    items
  )
VALUES
  (
    'f13a7adb-a202-48ae-a739-3b9c2e166a68' :: uuid,
    'b653c75e-2e5c-4d27-ac57-88ad8c82c925' :: uuid,
    0,
    '[{"type":"Message","message":"Hello you!"},{"type":"Message","message":"Welcome to Parampara"},{"type":"Message","message":"Hows your day?","action":{"type":"ChooseResponse","responses":[{"message":"Good"},{"message":"Bad","nextId":4}] } },{ "type" :"Message","message" :"Nice to hear!","nextId" :5 },{ "type" :"Message","message" :"Sorry to hear that." },{ "type" :"Message","message" :"I am emailing you a document. What do you think about that?","action": { "type" :"Comment" } },{ "type" :"Message","message" :"Good bye!" } ]' :: text
  ) returning id;

INSERT INTO
  public.script_version (
    script_id,
    id,
    version,
    items
  )
VALUES
  (
    'f13a7adb-a202-48ae-a739-3b9c2e166a68' :: uuid,
    'b653c75e-2e5c-4d27-ac57-88ad8c82c926' :: uuid,
    1,
    '[{"type":"Message","message":"Hello you!"},{"type":"Message","message":"Welcome to Parampara"},{"type":"Message","message":"Hows your day?","action":{"type":"ChooseResponse","responses":[{"message":"Good"},{"message":"Bad","nextId":4}] } },{ "type" :"Message","message" :"Nice to hear!","nextId" :5 },{ "type" :"Message","message" :"Sorry to hear that." },{ "type" :"Message","message" :"I am emailing you a document. What do you think about that?","action": { "type" :"Comment" } },{ "type" :"Message","message" :"Good bye!" } ]' :: text
  ) returning id;