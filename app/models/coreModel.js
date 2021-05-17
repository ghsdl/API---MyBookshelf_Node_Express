const client = require('../client');

class CoreModel {

    dataValues = {};

    previousDataValues = {};

    set id(value) {
        this.dataValues.id = value;
    }

    get id() {
        this.dataValues.id;
    }

    static async find(options) {
        const result = await client.query(`SELECT * FROM ${this.tableName}`);
        return result.rows;
    }

    static async findByPk(id) {
        const result = await client.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return result.rows[0];
    }

}

module.exports = CoreModel;