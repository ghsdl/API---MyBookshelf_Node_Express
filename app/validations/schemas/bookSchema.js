const Joi = require('joi');

const insertSchema = Joi.object({
    reference: Joi.string().required().min(1),
    title: Joi.string().required().min(1),
    locale: Joi.string().required().min(2),
    year: Joi.date().max('now'),
    page_count: Joi.number().integer().required().min(2),
    chapter_count: Joi.number().integer().required().min(2),
    front_cover: Joi.string().required().min(2),
    cover: Joi.string().uri(),
    publisher_id: Joi.number().integer().required().min(1),
    author_id: Joi.array().items(Joi.number().integer()).required().min(1),
    genre_id: Joi.array().items(Joi.number().integer()).required().min(1)
}).required();

const updateSchema = Joi.object({
    reference: Joi.string().min(1),
    title: Joi.string().min(1),
    locale: Joi.string().min(2),
    year: Joi.date().max('now'),
    page_count: Joi.number().integer().min(2),
    chapter_count: Joi.number().integer().min(2),
    front_cover: Joi.string().min(2),
    cover: Joi.string().uri(),
    publisher_id: Joi.number().integer().min(1),
    author_id: Joi.array().items(Joi.number().integer()).min(1),
    genre_id: Joi.array().items(Joi.number().integer()).min(1)
}).required();

module.exports = { insertSchema, updateSchema };