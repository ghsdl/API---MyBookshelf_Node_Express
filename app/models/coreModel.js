const client = require('../client');

class CoreModel {

    dataValues = {};

    previousDataValues = {};

    constructor(obj) {
        for (const prop in obj) {
            this.dataValues[prop] = obj[prop];
        }
    }

    static async find(options) {
        const result = await client.query(`SELECT * FROM ${this.tableName}`);
        const instanceList = [];

        for (const row of result.rows) {
            instanceList.push(new this(row));
        }

        return instanceList;
    }

    static async findByPk(id) {
        const result = await client.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return new this(result.rows[0]);
    }

    async insert() {

        const preparedQuery = {

            text: `
                INSERT INTO ${this.constructor.tableName} 
                (${this.constructor.fields}) VALUES 
                (${this.constructor.fields.map((field, fieldIndex) => '$' + (fieldIndex+1))})
            `,
            values: this.constructor.fields.map(field => this.dataValues[field])
        };

        console.log(preparedQuery);

        const result = await client.query(preparedQuery);
        this.dataValues = result.rows[0];
        console.log(this.dataValues);

    }

    /* SECONDDE POSSIBLITE AVEC FUNCTION SQL

    async insert() {

        const preparedQuery = {

            text: `
                SELECT * FROM add_${this.constructor.tableName}($1)
            `,
            values: [this.dataValues]
        };

        const result = await client.query(preparedQuery);
        this.dataValues = result.rows[0];
        console.log(this.dataValues);
    }
    
    */
}

module.exports = CoreModel;