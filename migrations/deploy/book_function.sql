-- Deploy mybookshelf:book_function to pg

BEGIN;

CREATE FUNCTION add_book(book json) RETURNS book AS $$
WITH inserted_book AS (    
    INSERT INTO "book"
    ("reference", "title", "locale", "year", "page_count", "chapter_count", "front_cover", "cover", "publisher_id")
    VALUES(
        (book->>'reference'),
        (book->>'title'),
        (book->>'locale'),
        (book->>'year')::int,
        (book->>'page_count')::int,
        (book->>'chapter_count')::int,
        (book->>'front_cover'),
        (book->>'cover'),
        (book->>'publisher_id')::int
    ) RETURNING *
), author AS (
    INSERT INTO "book_has_author"
    ("book_id", "author_id")
    SELECT inserted_book.id, author.id::text::int
    FROM inserted_book, json_array_elements(book->'author_id') AS author(id)
), genre AS (
    INSERT INTO "book_has_genre"
    ("book_id", "genre_id")
    SELECT inserted_book.id, genre.id::text::int
    FROM inserted_book, json_array_elements(book->'genre_id') AS genre(id)
)
SELECT * FROM inserted_book;
$$ LANGUAGE sql;

CREATE FUNCTION update_book(book_input json) RETURNS book AS $$
    UPDATE "book" SET
    "reference" = book_input->>'reference',
    "title" = book_input->>'title',
    "locale" = book_input->>'locale', 
    "year" = (book_input->>'year')::int, 
    "page_count" = (book_input->>'page_count')::int,
    "chapter_count" = (book_input->>'chapter_count')::int, 
    "front_cover" = book_input->>'front_cover',
    "cover" = book_input->>'cover',
    "publisher_id" = (book_input->>'publisher_id')::int
    WHERE "id" = (book_input->>'id')::int
    RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION delete_book(id_input int) RETURNS void AS $$
    UPDATE "book" SET
    "deleted_at" = now()
    WHERE id = id_input
$$ LANGUAGE sql;

COMMIT;