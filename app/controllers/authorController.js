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

    async getById(req, res, next) {
        try {
            const data = await AuthorModel.findByPk(req.params.id);
            if(!data) {
                return next();
            }
            res.json( { data: data.dataValues });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    },

    async add(request, response){
        try {
            const author = new AuthorModel(request.body);
            await author.insert();
            response.json({ data: author.dataValues });
        }catch(error){
            console.trace(error);
        
            if(error.code === '23505'){
                error = `This resource already exists.`;
            }else{
                error = `A server error occured, please retry later.`;
            }
            response.json({ error });
        }
    },

    /*async delete(req, res) {
        try {
            const data = await AuthorModel.remove(req.params.id)
            res.json( { message: 'Deleted successfully!' });
        } catch (error) {
            console.trace(error);
            res.json({ error });
        }
    }*/

}