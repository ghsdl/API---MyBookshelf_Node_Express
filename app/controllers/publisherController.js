const PublisherModel = require('../models/publisherModel');

module.exports = {

    async getAll(_, res) {
        try {
            const publishers = await PublisherModel.find();
            res.json({ publishers });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async getById(req, res, next) {
        try {
            const publisher = await PublisherModel.findByPk(req.params.id);
            if (!publisher) {
                return next();
            }
            res.json( { data: publisher.dataValues });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async add(req, res){
        try {
            const publisher = new PublisherModel(req.body);
            await publisher.insert();
            res.json({ data: publisher.dataValues });
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
            const publisher = await PublisherModel.findByPk(req.params.id);

            if (!publisher) {
                return next();
            }

            publisher.data = req.body;
            await publisher.update();
            res.json({ data: publisher.dataValues });
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry updating later.`;
            res.json({ error });
        }
    },

    async delete(req, res, next) {
        try {
            const publisher = await PublisherModel.findByPk(req.params.id);

            if (!publisher) {
                return next();
            }

            await publisher.delete();
            res.status(204).json();
        } catch (error) {
            console.trace(error);
            error = `A server error occured, please retry deleting later.`;
            res.json({ error });
        }
    }

}