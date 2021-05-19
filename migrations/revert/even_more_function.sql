-- Revert mybookshelf:even_more_function from pg

BEGIN;

DROP FUNCTION "add_publisher";

DROP FUNCTION "update_publisher";

DROP FUNCTION "delete_publisher";

DROP FUNCTION "add_genre";

DROP FUNCTION "update_genre";

DROP FUNCTION "delete_genre";

COMMIT;
