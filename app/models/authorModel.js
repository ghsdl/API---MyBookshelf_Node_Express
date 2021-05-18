const CoreModel = require('./coreModel');

class AuthorModel extends CoreModel {

    static tableName = 'author';

    static fields = [
        'firstname',
        'lastname',
        'country_iso_2',
        'birthdate',
        'deathdate'
    ];

    constructor(obj){
        super(obj);
    }

    get fullname(){
        this.dataValues.firstname + ' ' + this.dataValues.lastname;
    }

}

module.exports = AuthorModel;