const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		// tasks: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: 'Task',
		// 	},
		// ],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
