const CoreModel = require('./coreModel');

class PublisherModel extends CoreModel {

    static tableName = 'publisher';

    constructor(){
        super();
    }

}

module.exports = PublisherModel;