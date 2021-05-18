const Joi = require('joi');

const schema = Joi.object({
    firstname: Joi.string().required().min(2),
    lastname: Joi.string().required().min(2),
    country_iso_2: Joi.string().required().length(2),
    birthdate: Joi.date().max('now'),
    deathdate: Joi.date().max('now')
}).required();

module.exports = schema;