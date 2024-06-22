const express = require('express');
const usersController = require('../../controllers/v1/usersController.js');
const isAuth = require('../../utils/isAuth.middleware.js');
const router = express.Router();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.login);
router.get('/me', isAuth, usersController.me);
router.delete('/deactivate', isAuth, usersController.deleteUser);

module.exports = router;
