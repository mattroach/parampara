/* Replace with your SQL commands */
CREATE TABLE script (
  id uuid PRIMARY KEY NOT NULL,
  created timestamp DEFAULT now()
);

CREATE TABLE scriptVersion (
  id uuid PRIMARY KEY NOT NULL,
  scriptId uuid NOT NULL REFERENCES script(id),
  version integer,
  created timestamp DEFAULT now(),
  title varchar(100) NOT NULL,
  reportingEmail varchar(100) NOT NULL,
  content text NOT NULL,
  allowAnon boolean DEFAULT TRUE
);

-- test data
INSERT INTO
  public.script (id)
VALUES
  ('f13a7adb-a202-48ae-a739-3b9c2e166a68' :: uuid) returning id;

INSERT INTO
  public.scriptversion (
    scriptid,
    id,
    title,
    reportingemail,
    content
  )
VALUES
  (
    'f13a7adb-a202-48ae-a739-3b9c2e166a68' :: uuid,
    'b653c75e-2e5c-4d27-ac57-88ad8c82c926' :: uuid,
    'the title' :: character varying(100),
    'jonah@getparampara.com' :: character varying(100),
    '{}' :: text
  ) returning id;