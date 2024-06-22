const express = require('express');
const router = express.Router();

router.use('/v1', require('./v1'));

router.get('/', require('../controllers/healthController.js').apiHealth);

module.exports = router;
