const AuthorModel = require('../models/authorModel');

module.exports = {

    async getAll(_, res) {
        try {
            const authors = await AuthorModel.find();
            res.json({ authors });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async getById(req, res, next) {
        try {
            const author = await AuthorModel.findByPk(req.params.id);
            if(!author) {
                return next();
            }
            res.json( { data: author.dataValues });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async add(req, res){
        try {
            const author = new AuthorModel(req.body);
            await author.insert();
            res.json({ data: author.dataValues });
        } catch(error) {
            console.trace(error);
        
            if (error.code === '23505'){
                error = `This resource already exists.`;
            } else {
                error = `A server error occured, please retry later.`;
            }
            res.json({ error });
        }
    },

    async update(req, res, next) {
        try {
            const author = await AuthorModel.findByPk(req.params.id);

            if(!author) {
                return next();
            }

            author.data = req.body;
            await author.update();
            res.json({ data: author.dataValues });
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry later.`;
            res.json({ error });
        }
    },

    async delete(req, res, next) {
        try {
            const author = await AuthorModel.findByPk(req.params.id);

            if(!author) {
                return next();
            }

            await author.delete();
            res.status(204).json();
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry later.`;
            res.json({ error });
        }
    }

}