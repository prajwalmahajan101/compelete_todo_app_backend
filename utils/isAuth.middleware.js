const jwt = require('jsonwebtoken');

const User = require('../models/User.js');
const constants = require('./constants.js');
const isAuth = async (req, res, next) => {
	try {
		// TODO: To Authenticate Request
		const authorization_header = req.headers.authorization;
		if (!authorization_header) {
			return res.status(401).json({
				msg: 'UnAuthorized',
			});
		}
		// Bearer sdasdasdasdasdasdasdas
		const [auth_type, token] = authorization_header.split(' ');
		if (auth_type !== 'Bearer') {
			return res.status(401).json({
				msg: 'Invalid Auth Type',
			});
		}
		const payload = jwt.verify(token, constants.JWT_SECRET);
		const {email} = payload.sub;
		const user = await User.findOne({email});
		if (!user) {
			return res.status(404).json({
				msg: 'User Not found',
			});
		}
		req.user = user;
		next();
	} catch (err) {
		console.log('err', err);
		return res.status(401).json({
			msg: 'Invalid Token',
		});
	}
};

module.exports = isAuth;
