const GenreModel = require('../models/genreModel');

module.exports = {

    async getAll(_, res) {
        try {
            const genres = await GenreModel.find();
            res.json({ genres });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async getById(req, res, next) {
        try {
            const genre = await GenreModel.findByPk(req.params.id);
            if (!genre) {
                return next();
            }
            res.json( { data: genre.dataValues });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async add(req, res){
        try {
            const genre = new GenreModel(req.body);
            await genre.insert();
            res.json({ data: genre.dataValues });
        } catch(error) {
            console.trace(error);
        
            if (error.code === '23505'){
                error = `This resource already exists.`;
            } else {
                error = `A server error occured, please retry adding later.`;
            }
            res.json({ error });
        }
    },

    async update(req, res, next) {
        try {
            const genre = await GenreModel.findByPk(req.params.id);

            if (!genre) {
                return next();
            }

            genre.data = req.body;
            await genre.update();
            res.json({ data: genre.dataValues });
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry updating later.`;
            res.json({ error });
        }
    },

    async delete(req, res, next) {
        try {
            const genre = await GenreModel.findByPk(req.params.id);

            if (!genre) {
                return next();
            }

            await genre.delete();
            res.status(204).json();
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry deleting later.`;
            res.json({ error });
        }
    }

}