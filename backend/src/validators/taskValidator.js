const { z } = require('zod');

/**
 * Validation schemas using Zod
 * All request bodies are validated using these schemas
 */

// Valid status values
const statusEnum = z.enum(['todo', 'in-progress', 'done']);

// Valid priority values
const priorityEnum = z.enum(['low', 'medium', 'high']);

/**
 * Schema for creating a new task
 * - title: required, 1-100 characters
 * - description: optional, max 500 characters
 * - status: optional, defaults to 'todo'
 * - priority: optional, defaults to 'medium'
 * - dueDate: optional, must be valid ISO date string if provided
 */
const createTaskSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, { message: 'Title cannot be empty' })
    .max(100, { message: 'Title must be less than 100 characters' })
    .trim(),
  
  description: z
    .string()
    .max(500, { message: 'Description must be less than 500 characters' })
    .optional()
    .default(''),
  
  status: statusEnum.optional().default('todo'),
  
  priority: priorityEnum.optional().default('medium'),
  
  dueDate: z
    .string()
    .datetime({ message: 'Due date must be a valid ISO date string' })
    .nullable()
    .optional(),
});

/**
 * Schema for updating an existing task
 * All fields are optional since it's a partial update
 */
const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title cannot be empty' })
    .max(100, { message: 'Title must be less than 100 characters' })
    .trim()
    .optional(),
  
  description: z
    .string()
    .max(500, { message: 'Description must be less than 500 characters' })
    .optional(),
  
  status: statusEnum.optional(),
  
  priority: priorityEnum.optional(),
  
  dueDate: z
    .string()
    .datetime({ message: 'Due date must be a valid ISO date string' })
    .nullable()
    .optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  statusEnum,
  priorityEnum,
};
