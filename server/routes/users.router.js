const express = require('express');

const router = express.Router();
const controller = require('../controllers/users.controller');

// POST: Login controller
router.route('/:guid').get(controller.get);

// POST: Sigunp controller
router.route('/').get(controller.get);

module.exports = router;
