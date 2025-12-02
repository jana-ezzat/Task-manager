const { v4: uuidv4 } = require('uuid');

/**
 * In-Memory Task Storage
 * All tasks are stored in this array (no database for Phase 1)
 */
let tasks = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the Task Manager API including setup instructions and API endpoints.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review code quality',
    description: 'Ensure all controllers follow best practices and error handling is consistent.',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Setup development environment',
    description: 'Install Node.js, configure environment variables, and test API endpoints.',
    status: 'done',
    priority: 'low',
    dueDate: null,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Implement search functionality',
    description: 'Add text search capability across task titles and descriptions.',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Task Model - In-Memory CRUD Operations
 */
const TaskModel = {
  /**
   * Get all tasks
   * @returns {Array} Array of all tasks
   */
  getAll() {
    return [...tasks];
  },

  /**
   * Get single task by ID
   * @param {string} id - Task ID
   * @returns {Object|null} Task object or null if not found
   */
  getById(id) {
    return tasks.find(task => task.id === id) || null;
  },

  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @returns {Object} Created task
   */
  create(taskData) {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    return newTask;
  },

  /**
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Object|null} Updated task or null if not found
   */
  update(id, taskData) {
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
      return null;
    }

    const existingTask = tasks[index];
    const updatedTask = {
      ...existingTask,
      title: taskData.title !== undefined ? taskData.title : existingTask.title,
      description: taskData.description !== undefined ? taskData.description : existingTask.description,
      status: taskData.status !== undefined ? taskData.status : existingTask.status,
      priority: taskData.priority !== undefined ? taskData.priority : existingTask.priority,
      dueDate: taskData.dueDate !== undefined ? taskData.dueDate : existingTask.dueDate,
      updatedAt: new Date().toISOString(),
    };

    tasks[index] = updatedTask;
    return updatedTask;
  },

  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
      return false;
    }

    tasks.splice(index, 1);
    return true;
  },

  /**
   * Reset tasks to initial state (for testing)
   */
  reset() {
    tasks = [];
  },
};

module.exports = TaskModel;
