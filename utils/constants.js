const constants = {
	PORT: +process.env.PORT ? +process.env.PORT : 8000,
	MONGODB_URI:
		process.env.MONGODB_URI ??
		'mongodb://localhost:27017/complete_todo_app',
	JWT_SECRET: process.env.JWT_SECRET ?? 'some_stupid_secret',
};

module.exports = constants;
