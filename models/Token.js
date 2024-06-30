const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		token: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{timestamps: true}
);

module.exports = mongoose.model('Token', tokenSchema);
