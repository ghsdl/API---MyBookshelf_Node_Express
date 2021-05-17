const CoreModel = require('./coreModel');

class AuthorModel extends CoreModel {

    static tableName = 'author';

    constructor(){
        super();
    }

    set firstname(value){
        this.dataValues.firstname = value;
    }

    get firstname(){
        this.dataValues.firstname;
    }

    set lastname(value){
        this.dataValues.lastname = value;
    }

    get lastname(){
        this.dataValues.lastname;
    }

    set country(value){
        this.dataValues.country_iso_2 = value;
    }

    get country(){
        this.dataValues.country_iso_2;
    }

    set birthdate(value){
        this.dataValues.birthdate = value;
    }

    get birthdate(){
        this.dataValues.birthdate;
    }

    set deathdate(value){
        this.dataValues.deathdate = value;
    }

    get deathdate(){
        this.dataValues.deathdate;
    }

    get fullname(){
        this.dataValues.firstname + ' ' + this.dataValues.lastname;
    }

}

module.exports = AuthorModel;