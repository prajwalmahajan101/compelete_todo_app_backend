const mongoose = require('mongoose');
const constants = require('./constants.js');

mongoose.connect(constants.MONGODB_URI).then((res) => {
	console.log('MongoDb Connected');
});

module.exports = mongoose;
