-- Deploy mybookshelf:even_more_function to pg

BEGIN;

CREATE FUNCTION add_publisher(publisher json) RETURNS publisher AS $$
    INSERT INTO "publisher"
    ("name", "country_iso_2")
    VALUES(
        (publisher->>'name'),
        (publisher->>'country_iso_2')
    ) RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION update_publisher(publisher_input json) RETURNS publisher AS $$
    UPDATE "publisher" SET
    "name" = publisher_input->>'name', 
    "country_iso_2" = publisher_input->>'country_iso_2'
    WHERE "id" = (publisher_input->>'id')::int
    RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION delete_publisher(id_input int) RETURNS void AS $$
    UPDATE "publisher" SET
    "deleted_at" = now()
    WHERE id = id_input
$$ LANGUAGE sql;

CREATE FUNCTION add_genre(genre json) RETURNS genre AS $$
    INSERT INTO "genre"
    ("label")
    VALUES(
        (genre->>'label')
    ) RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION update_genre(genre_input json) RETURNS genre AS $$
    UPDATE "genre" SET
    "label" = genre_input->>'label'
    WHERE "id" = (genre_input->>'id')::int
    RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION delete_genre(id_input int) RETURNS void AS $$
    UPDATE "genre" SET
    "deleted_at" = now()
    WHERE id = id_input
$$ LANGUAGE sql;


COMMIT;