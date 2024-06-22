const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		status: {
			type: String,
			default: 'Not Started',
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Task', taskSchema);
