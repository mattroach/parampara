ALTER TABLE session_response
DROP CONSTRAINT session_response_session_progress_id_fkey,
ADD CONSTRAINT session_response_session_progress_id_fkey
   FOREIGN KEY (session_progress_id)
   REFERENCES "session_progress"(id);