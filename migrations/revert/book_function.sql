-- Revert mybookshelf:book_function from pg

BEGIN;

DROP FUNCTION "add_book";

DROP FUNCTION "update_book";

DROP FUNCTION "delete_book";

COMMIT;