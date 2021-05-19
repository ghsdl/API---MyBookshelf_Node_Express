const CoreModel = require('./coreModel');

class GenreModel extends CoreModel {

    static tableName = 'genre';

    static fields = [
        'label'
    ];

    constructor(obj){
        super(obj);
    }

}

module.exports = GenreModel;