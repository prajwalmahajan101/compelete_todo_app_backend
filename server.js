require('dotenv').config();
const constants = require('./utils/constants.js');
require('./utils/db');
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
	console.log(err);
	return res.json({
		msg: 'Error Occurred ',
		err,
	});
});

app.listen(constants.PORT, () => {
	console.log(`Server Running of http://localhost:${constants.PORT}`);
});
