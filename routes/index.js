const express = require('express');

const upload = require('../utils/multer.middleware.js');
const router = express.Router();

router.use('/v1', require('./v1'));

router.get('/', require('../controllers/healthController.js').apiHealth);

router.post('/upload', upload.single('file'), (req, res) => {
	return res.sendStatus(200);
});

module.exports = router;
