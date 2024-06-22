const express = require('express');

const tasksController = require('../../controllers/v1/tasksController.js');

const router = express.Router();

router.post('/', tasksController.createTask);
router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.patch('/:id', tasksController.updateTaskById);
router.delete('/:id', tasksController.deleteTaskById);

module.exports = router;
