import { Task, CreateTaskDto, UpdateTaskDto, TaskFilters } from '@/types/task';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new ApiError(response.status, error.message || 'An error occurred');
  }
  return response.json();
}

export const taskApi = {
  // Get all tasks with optional filters
  async getAll(filters?: TaskFilters): Promise<Task[]> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const queryString = params.toString();
    const url = `${API_BASE_URL}/tasks${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    return handleResponse<Task[]>(response);
  },

  // Get single task by ID
  async getById(id: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    return handleResponse<Task>(response);
  },

  // Create new task
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(response);
  },

  // Update existing task
  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(response);
  },

  // Delete task
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete' }));
      throw new ApiError(response.status, error.message);
    }
  },
};

export { ApiError };
