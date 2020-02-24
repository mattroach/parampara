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