const express = require('express');
const isAuth = require('../../utils/isAuth.middleware.js');

const router = express.Router();

router.use('/users', require('./users.js'));
router.use('/tasks', isAuth, require('./tasks.js'));

module.exports = router;
