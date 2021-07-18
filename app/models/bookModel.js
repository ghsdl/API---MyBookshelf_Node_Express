const CoreModel = require('./coreModel');
const client = require('../client');

/**
 * @typedef Book
 * @property {number} id - Unique identifier
 * @property {string} reference - Book reference
 * @property {string} title - Book title
 * @property {string} locale - Book locale language
 * @property {number} year - Book publication date (YYYY-MM-DD)
 * @property {number} page_count - Book page count 
 * @property {number} chapter_count - Book chapter count 
 * @property {string} front_cover - Book front cover
 * @property {string} cover - Book cover
 * @property {number} publisher_id - Book publisher id (YYYY-MM-DD)
 * @property {string} created_at - Book creation date (date ISO 8601)
 * @property {string} updated_at - Book updated date (date ISO 8601)
 * @property {string} deleted_at - Book deleted date (date ISO 8601)
 */

/**
 * @typedef BookInput
 * @property {string} reference - Book reference
 * @property {string} title - Book title
 * @property {string} locale - Book locale language
 * @property {number} year - Book publication date (YYYY-MM-DD)
 * @property {number} page_count - Book page count 
 * @property {number} chapter_count - Book chapter count 
 * @property {string} front_cover - Book front cover
 * @property {string} cover - Book cover
 * @property {number} publisher_id - Book publisher id (YYYY-MM-DD)
 */

class BookModel extends CoreModel {

    /**
     * Database's table name
     */
    static tableName = 'book';
  
    /**
     * Lists of entity fields
     */
    static fields = [
        'reference',
        'title',
        'locale',
        'year',
        'page_count',
        'chapter_count',
        'front_cover',
        'cover',
        'publisher_id',
        'author_id',
        'genre_id'
    ];

    /**
     * Class instanciation
     * @param {object} obj 
     */
    constructor(obj) {
        super(obj);
    }

    /**
     * Getting several entities
     * @param {object} options object with filtering parameters
     * @returns {object[]} Instance lists
     */
    static async find(options) {

        try {
        const result = await client.query(`
            SELECT
                book.*,
                array_agg(DISTINCT a.id) AS author_id,
                array_agg(DISTINCT g.id) AS genre_id
            FROM ${this.tableName}
            JOIN book_has_author AS bha ON book.id = bha.book_id
            JOIN book_has_genre AS bhg ON book.id = bhg.book_id
            JOIN author AS a ON a.id = bha.author_id
            JOIN genre AS g ON g.id = bhg.genre_id
            WHERE book.deleted_at IS NULL
            GROUP BY book.id
        `);

        const instanceList = [];

        for (const row of result.rows) {
            instanceList.push(new this(row));
        }

        return instanceList;

        } catch (error) {
            console.trace(error)
        }
    }

    // SURCHARGING BOOK MODEL FOR JOIN TABLES
    async insert() {

        try {

            await super.insert()

            if (this.dataValues.author_id) {

                for (const author_id of this.dataValues.author_id) {
                    await client.query(`INSERT INTO "book_has_author" ("book_id", "author_id") VALUES ($1, $2)`, [this.dataValues.id, author_id])
                }
            }

            if (this.dataValues.genre_id) {
                for (const genre_id of this.dataValues.genre_id) {
                    await client.query(`INSERT INTO "book_has_genre" ("book_id", "genre_id") VALUES ($1, $2)`, [this.dataValues.id, genre_id])
                }
            }
        } catch (error) {
            console.trace(error)
        }
    }
}

module.exports = BookModel;