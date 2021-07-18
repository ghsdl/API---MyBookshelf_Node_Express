const CoreModel = require('./coreModel');

/**
 * @typedef Publisher
 * @property {number} id - Unique identifier
 * @property {string} name - Publisher name
 * @property {string} country_iso_2 - Publisher country name (ISO 3166 Alpha-2)
 * @property {string} created_at - Publisher creation date (date ISO 8601)
 * @property {string} updated_at - Publisher updated date (date ISO 8601)
 * @property {string} deleted_at - Publisher deleted date (date ISO 8601)
 */

/**
 * @typedef PublisherInput
 * @property {string} name - Publisher name
 * @property {string} country_iso_2 - Publisher country name (ISO 3166 Alpha-2)
 */

class PublisherModel extends CoreModel {

    /**
     * Database table name
     */
    static tableName = 'publisher';

    /**
     * Lists of entity fields
     */
    static fields = [
        'name',
        'country_iso_2'
    ];

    /**
     * Class instanciation
     * @param {object} obj 
     */
    constructor(obj){
        super(obj);
    }

}

module.exports = PublisherModel;