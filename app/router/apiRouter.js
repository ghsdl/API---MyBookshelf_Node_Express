const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

// ROUTES
router.route('/authors')
    .get(authorController.getAll)

module.exports = router;