const CoreModel = require('./coreModel');
const client = require('../client');

class BookModel extends CoreModel {

    static tableName = 'book';

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

    constructor(obj) {
        super(obj);
    }

    static async find() {

        try {
        const result = await client.query(`SELECT
        b.*,
        array_agg(DISTINCT a.id) AS author_id,
        array_agg(DISTINCT g.id) AS genre_id
        FROM book AS b
        JOIN book_has_author AS bha
        ON b.id = bha.book_id
        JOIN book_has_genre AS bhg
        ON b.id = bhg.book_id
        JOIN author AS a 
        ON a.id = bha.author_id
        JOIN genre AS g
        ON g.id = bhg.genre_id
        GROUP BY b.id;`);

        const instanceList = [];

        for (const row of result.rows) {
            instanceList.push(new this(row));
        }

        return instanceList;

        } catch (error) {
            console.trace('Trace error du bookModel', error)
        }
    }

    async insert() {

        try {

            await super.insert()

            if (this.dataValues.author_id) {

                for (const field of this.dataValues.author_id) {
                    await client.query(`INSERT INTO "book_has_author" ("book_id", "author_id") VALUES ($1, $2)`, [this.dataValues.id, author_id])
                }
            }

            if (this.dataValues.genre_id) {
                for (const field of this.dataValues.genre_id) {
                    await client.query(`INSERT INTO "book_has_genre" ("book_id", "genre_id") VALUES ($1, $2)`, [this.dataValues.id, genre_id])
                }
            }
        } catch (error) {
            console.trace('Trace error du bookModel', error)
        }
    }
}

module.exports = BookModel;