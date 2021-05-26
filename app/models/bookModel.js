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
            console.trace('Trace error du bookModel' , error)
        }
    }
}

module.exports = BookModel;