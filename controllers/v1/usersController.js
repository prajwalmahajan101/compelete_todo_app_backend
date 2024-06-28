const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User.js');
const Task = require('../../models/Task.js');
const constants = require('../../utils/constants.js');
const Token = require('../../models/Token.js');

const getAccessToken = (user) => {
	const payload = {
		sub: {
			email: user.email,
		},
	};

	const token = jwt.sign(payload, constants.JWT_SECRET, {
		expiresIn: '30m',
	});
	return token;
};

const getRefreshToken = async (user) => {
	let refToken = await Token.findOne({user: user.id});
	if (refToken) return refToken.token;
	const payload = {
		sub: {
			email: user.email,
		},
	};
	const token = jwt.sign(payload, constants.JWT_SECRET_RT);
	refToken = Token({user: user.id, token});
	await refToken.save();
	return token;
};

module.exports.registerUser = async (req, res, next) => {
	try {
		const {username, email, password} = req.body;

		// user email
		let user = await UserModel.findOne({email});
		if (user) {
			return res.status(409).json({
				msg: 'email already taken',
			});
		}
		// password hash+salt
		const hashedpwd = await bcrypt.hash(password, 12);
		// user with hashedpwd
		user = new UserModel({
			username,
			email,
			password: hashedpwd,
		});
		// user save
		await user.save();

		return res.status(200).json({
			msg: 'User Registered',
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.login = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		// Find user with email
		let user = await UserModel.findOne({email});
		if (!user) {
			return res.status(404).json({
				msg: 'User Not found',
			});
		}
		// compare
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				msg: 'Email or Password Wrong',
			});
		}

		const access_token = getAccessToken(user);
		const refresh_token = await getRefreshToken(user);

		return res.status(200).json({
			msg: 'User Logged In',
			access_token,
			refresh_token,
		});
	} catch (err) {
		next(err);
	}
};

module.exports.me = async (req, res, next) => {
	try {
		let user = req.user;
		return res.status(200).json({
			msg: 'Current User',
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.deleteUser = async (req, res, next) => {
	try {
		const user = req.user;
		await Task.deleteMany({owner: user.id});
		await UserModel.findByIdAndDelete(user.id);
		return res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

module.exports.getTokenByRfToken = async (req, res, next) => {
	try {
		const {refresh_token} = req.body;
		if (!refresh_token)
			return res.status(401).json({msg: 'No Refresh Token Found'});
		const token = await Token.findOne({token: refresh_token});
		if (!token)
			return res.status(401).json({msg: 'No Refresh Token Found'});

		await token.populate('user');
		const user = token.user;
		if (!user) return res.status(401).json({msg: 'You Are Not Allowed'});
		const access_token = getAccessToken(user);
		return res.status(200).json({
			msg: 'New Access token Generated',
			data: {
				access_token,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.logout = async (req, res, next) => {
	try {
		const user = req.user;
		await Token.deleteOne({user: user.id});
		return res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
