const TaskModel = require('../models/Task');

// GET /api/tasks - Get all tasks with filters, search, and sort
const getAllTasks = (req, res, next) => {
  try {
    const { search, status, priority, sortBy, sortOrder } = req.query;
    
    let tasks = TaskModel.getAll();

    // Search by title or description
    if (search) {
      const searchLower = search.toLowerCase();
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    // Filter by priority
    if (priority) {
      tasks = tasks.filter(task => task.priority === priority);
    }

    // Sort tasks
    if (sortBy) {
      const order = sortOrder === 'asc' ? 1 : -1;
      
      tasks.sort((a, b) => {
        let aVal, bVal;

        switch (sortBy) {
          case 'title':
            aVal = a.title.toLowerCase();
            bVal = b.title.toLowerCase();
            return aVal.localeCompare(bVal) * order;
          
          case 'priority':
            const priorityOrder = { low: 1, medium: 2, high: 3 };
            aVal = priorityOrder[a.priority];
            bVal = priorityOrder[b.priority];
            return (aVal - bVal) * order;
          
          case 'dueDate':
            aVal = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            bVal = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            return (aVal - bVal) * order;
          
          case 'createdAt':
          default:
            aVal = new Date(a.createdAt).getTime();
            bVal = new Date(b.createdAt).getTime();
            return (aVal - bVal) * order;
        }
      });
    }

    console.log(`📋 Returning ${tasks.length} tasks`);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id - Get single task
const getTaskById = (req, res, next) => {
  try {
    const { id } = req.params;
    const task = TaskModel.getById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// POST /api/tasks - Create new task
const createTask = (req, res, next) => {
  try {
    const taskData = req.body;
    const newTask = TaskModel.create(taskData);
    
    console.log(`✅ Created task: ${newTask.title}`);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id - Update task
const updateTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const taskData = req.body;
    
    const updatedTask = TaskModel.update(id, taskData);

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log(`📝 Updated task: ${updatedTask.title}`);
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id - Delete task
const deleteTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = TaskModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log(`🗑️ Deleted task: ${id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
