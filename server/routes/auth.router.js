const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth.controller');

// POST: Login controller
router.route('/login').post(controller.login);

// POST: Sigunp controller
router.route('/signup').post(controller.signup);

module.exports = router;
