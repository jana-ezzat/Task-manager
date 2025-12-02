const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middleware/validateRequest');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');

// GET /api/tasks - Get all tasks with optional filters
router.get('/', taskController.getAllTasks);

// GET /api/tasks/:id - Get single task by ID
router.get('/:id', taskController.getTaskById);

// POST /api/tasks - Create new task
router.post('/', validateRequest(createTaskSchema), taskController.createTask);

// PUT /api/tasks/:id - Update task
router.put('/:id', validateRequest(updateTaskSchema), taskController.updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
