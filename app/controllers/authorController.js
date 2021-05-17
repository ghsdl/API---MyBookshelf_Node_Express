const AuthorModel = require('../models/authorModel');

module.exports = {

    async getAll(_, res) {
        try {
            const data = await AuthorModel.find();
            res.json({ data });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);

            const data = await AuthorModel.find();
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    }

}