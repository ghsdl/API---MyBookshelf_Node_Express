const CoreModel = require('./coreModel');

class BookModel extends CoreModel {

    static tableName = 'book';

    constructor(){
        super();
    }

}

module.exports = BookModel;