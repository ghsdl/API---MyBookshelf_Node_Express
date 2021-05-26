const BookModel = require('../models/bookModel');

module.exports = {

    async getAll(_, res) {
        try {
            const books = await BookModel.find();
            res.json({ books });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async getById(req, res, next) {
        try {
            const book = await BookModel.findByPk(req.params.id);
            if(!book) {
                return next();
            }
            res.json( { data: book.dataValues });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async add(req, res){
        try {
            const book = new BookModel(req.body);
            await book.insert();
            res.json({ data: book.dataValues });
        } catch(error) {
            console.trace('Trace error du bookController' , error);
        
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
            const book = await BookModel.findByPk(req.params.id);

            if(!book) {
                return next();
            }

            book.data = req.body;
            await book.update();
            res.json({ data: book.dataValues });
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry later.`;
            res.json({ error });
        }
    },

    async delete(req, res, next) {
        try {
            const book = await BookModel.findByPk(req.params.id);

            if(!book) {
                return next();
            }

            await book.delete();
            res.status(204).json();
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry later.`;
            res.json({ error });
        }
    }

}