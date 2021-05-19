const express = require('express');
const { authorInsertSchema, authorUpdateSchema , publisherInsertSchema, publisherUpdateSchema, genreInsertSchema, genreUpdateSchema} = require('../validations/schemas');
const validate = require('../validations/validate');
const authorController = require('../controllers/authorController');
const publisherController = require('../controllers/publisherController');
const genreController = require('../controllers/genreController');
const errorController = require('../controllers/errorController');

const router = express.Router();

// AUTHOR ROUTES
router.route('/authors')
    .get(authorController.getAll)
    .post(validate.body(authorInsertSchema), authorController.add);

router.route('/authors/:id(\\d+)')
    .get(authorController.getById)
    .patch(validate.body(authorUpdateSchema), authorController.update)
    .delete(authorController.delete);

// PUBLISHER ROUTES
router.route('/publishers')
    .get(publisherController.getAll)
    .post(validate.body(publisherInsertSchema), publisherController.add);

router.route('/publishers/:id(\\d+)')
    .get(publisherController.getById)
    .patch(validate.body(publisherUpdateSchema), publisherController.update)
    .delete(publisherController.delete);

// GENRES ROUTES
router.route('/genres')
    .get(genreController.getAll)
    .post(validate.body(genreInsertSchema), genreController.add);

router.route('/genres/:id(\\d+)')
    .get(genreController.getById)
    .patch(validate.body(genreUpdateSchema), genreController.update)
    .delete(genreController.delete);

router.use(errorController.resourceNotFound);

module.exports = router;