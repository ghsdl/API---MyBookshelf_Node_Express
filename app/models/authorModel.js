const CoreModel = require('./coreModel');

/**
 * @typedef Author
 * @property {number} id - Identifiant unique
 * @property {string} firstname - Prénom de l'auteur
 * @property {string} lastname - Nom de famille de l'auteur
 * @property {string} country_iso_2 - Pays d'origine de l'auteur (ISO 3166 Alpha-2)
 * @property {string} birthdate - Date de naissance de l'auteur (YYYY-MM-DD)
 * @property {string} deathdate - Date de mort de l'auteur (YYYY-MM-DD)
 * @property {string} created_at - Date de création de l'auteur (date ISO 8601)
 * @property {string} updated_at - Date de mise à jour de l'auteur (date ISO 8601)
 * @property {string} deleted_at - Date de suppression de l'auteur (date ISO 8601)
 */

/**
 * @typedef AuthorInput
 * @property {string} firstname - Prénom de l'auteur
 * @property {string} lastname - Nom de famille de l'auteur
 * @property {string} country_iso_2 - Pays d'origine de l'auteur (ISO 3166 Alpha-2)
 * @property {string} birthdate - Date de naissance de l'auteur (YYYY-MM-DD)
 * @property {string} deathdate - Date de mort de l'auteur (YYYY-MM-DD)
 */

class AuthorModel extends CoreModel {

    /**
     * Nom de la table dans la BDD
     */
    static tableName = 'author';

    /**
     * Listes des champs de l'entité 
     */
    static fields = [
        'firstname',
        'lastname',
        'country_iso_2',
        'birthdate',
        'deathdate'
    ];

    /**
     * Initialisation/instanciation de la classe
     * @param {object} obj 
     */
    constructor(obj){
        super(obj);
    }

    /**
     * Getter permettant de récupérer le nom complet d'un auteur
     */
    get fullname(){
        this.dataValues.firstname + ' ' + this.dataValues.lastname;
    }

}

module.exports = AuthorModel;