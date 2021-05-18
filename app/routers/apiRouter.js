const express = require('express');
const { authorInsertSchema, authorUpdateSchema } = require('../validations/schemas');
const validate = require('../validations/validate');
const authorController = require('../controllers/authorController');
const errorController = require('../controllers/errorController');

const router = express.Router();

// ROUTES
router.route('/authors')
    .get(authorController.getAll)
    .post(validate.body(authorInsertSchema), authorController.add);

router.route('/authors/:id(\\d+)')
    .get(authorController.getById)
    .patch(validate.body(authorUpdateSchema), authorController.update)
    .delete(authorController.delete);

router.use(errorController.resourceNotFound);

module.exports = router;