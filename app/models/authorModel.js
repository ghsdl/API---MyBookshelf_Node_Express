const CoreModel = require('./coreModel');

/**
 * @typedef Author
 * @property {number} id - Unique identifier
 * @property {string} firstname - Author firstname
 * @property {string} lastname - Author lastname
 * @property {string} country_iso_2 - Author country name (ISO 3166 Alpha-2)
 * @property {string} birthdate - Author birthdate (YYYY-MM-DD)
 * @property {string} deathdate - Author deathdate (YYYY-MM-DD)
 * @property {string} created_at - Author creation date (date ISO 8601)
 * @property {string} updated_at - Author updated date (date ISO 8601)
 * @property {string} deleted_at - Author deleted date (date ISO 8601)
 */

/**
 * @typedef AuthorInput
 * @property {string} firstname - Author firstname
 * @property {string} lastname - Author lastname
 * @property {string} country_iso_2 - Author country name (ISO 3166 Alpha-2)
 * @property {string} birthdate - Author birthdate (YYYY-MM-DD)
 * @property {string} deathdate - Author deathdate (YYYY-MM-DD)
 */

class AuthorModel extends CoreModel {

    /**
     * Database table name
     */
    static tableName = 'author';

    /**
     * Lists of entity fields
     */
    static fields = [
        'firstname',
        'lastname',
        'country_iso_2',
        'birthdate',
        'deathdate'
    ];

    /**
     * Class instanciation
     * @param {object} obj 
     */
    constructor(obj){
        super(obj);
    }

    /**
     * Getter to get complete author name
     */
    get fullname(){
        this.dataValues.firstname + ' ' + this.dataValues.lastname;
    }

}

module.exports = AuthorModel;