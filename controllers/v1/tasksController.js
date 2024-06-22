const Task = require('../../models/Task.js');
const User = require('../../models/User.js');

module.exports.createTask = async (req, res, next) => {
	try {
		const {title, description, status} = req.body;
		const owner = req.user;
		const task = new Task({
			title,
			description,
			status,
			owner,
		});

		await task.save();

		return res.status(201).json({
			msg: 'Task Successfully Created',
			data: {
				task: {
					id: task.id,
					title: task.title,
					description: task.description,
					status: task.status,
					createdAt: task.createdAt,
					updatedAt: task.updatedAt,
				},
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.getAllTasks = async (req, res, next) => {
	try {
		const owner = req.user;
		const tasks = await Task.find({owner: owner.id});
		return res.status(200).json({
			msg: 'Tasks Fetched',
			data: {
				tasks,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.getTaskById = async (req, res, next) => {
	try {
		const {id} = req.params;
		const owner = req.user;
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({
				msg: `Task with id ${id} not Found`,
			});
		}
		if (task.owner != owner.id) {
			return res.status(403).json({
				msg: 'You are not the owner of Task',
			});
		}
		return res.status(200).json({
			msg: 'Task Fetched',
			data: {
				task,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.updateTaskById = async (req, res, next) => {
	try {
		const {id} = req.params;
		const {email} = req.user;

		const {title, description, status} = req.body;
		const updatableData = {};
		if (title) updatableData.title = title;
		if (description) updatableData.description = description;
		if (status) updatableData.status = status;
		// Unoptimized
		const owner = await User.findOne({email});
		if (!owner) {
			return res.status(404).json({
				msg: 'User Is Deleted',
			});
		}
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({
				msg: `Task with id ${id} not Found`,
			});
		}
		if (task.owner != owner.id) {
			return res.status(403).json({
				msg: 'You are not the owner of Task',
			});
		}
		const updatedTask = await Task.findByIdAndUpdate(id, updatableData, {
			new: true,
		});
		return res.status(200).json({
			msg: 'Task Updated',
			data: {
				updatedTask,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.deleteTaskById = async (req, res, next) => {
	try {
		const {id} = req.params;
		const {email} = req.user;
		const owner = await User.findOne({email});
		if (!owner) {
			return res.status(404).json({
				msg: 'User Is Deleted',
			});
		}
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({
				msg: `Task with id ${id} not Found`,
			});
		}
		if (task.owner != owner.id) {
			return res.status(403).json({
				msg: 'You are not the owner of Task',
			});
		}
		await Task.findByIdAndDelete(id);

		return res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
