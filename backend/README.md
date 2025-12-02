# TaskFlow Backend API

A Node.js backend for the TaskFlow Task Manager application.

## Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete tasks
- 🔍 **Search** - Search tasks by title or description
- 🏷️ **Filter** - Filter by status (todo, in-progress, done) and priority (low, medium, high)
- ↕️ **Sort** - Sort by date, priority, or title
- ✔️ **Validation** - Request validation using Zod
- 📁 **Clean Structure** - Organized with controllers, routes, models, validators, middleware

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── taskController.js    # Request handlers
│   ├── routes/
│   │   └── taskRoutes.js        # API route definitions
│   ├── models/
│   │   └── Task.js              # In-memory data storage
│   ├── validators/
│   │   └── taskValidator.js     # Zod validation schemas
│   ├── middleware/
│   │   ├── validateRequest.js   # Validation middleware
│   │   └── errorHandler.js      # Global error handler
│   ├── utils/
│   │   └── generateId.js        # Utility functions
│   └── app.js                   # Express app setup
├── index.js                     # Server entry point
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (with optional filters) |
| GET | `/api/tasks/:id` | Get single task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update existing task |
| DELETE | `/api/tasks/:id` | Delete task |

### Query Parameters (GET /api/tasks)

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search in title and description |
| `status` | string | Filter by status: `todo`, `in-progress`, `done` |
| `priority` | string | Filter by priority: `low`, `medium`, `high` |
| `sortBy` | string | Sort field: `createdAt`, `dueDate`, `priority`, `title` |
| `sortOrder` | string | Sort direction: `asc` or `desc` |

### Request Body Examples

**Create Task:**
```json
{
  "title": "Complete project",
  "description": "Finish the backend implementation",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-15T00:00:00.000Z"
}
```

**Update Task:**
```json
{
  "status": "in-progress",
  "priority": "medium"
}
```

## Validation

All request bodies are validated using Zod schemas:

- **title**: Required, 1-100 characters
- **description**: Optional, max 500 characters
- **status**: Must be `todo`, `in-progress`, or `done`
- **priority**: Must be `low`, `medium`, or `high`
- **dueDate**: Must be valid ISO date string or null

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## Technologies Used

- **Express.js** - Web framework
- **Zod** - Schema validation
- **UUID** - ID generation
- **CORS** - Cross-origin resource sharing

## Notes

- This is a Phase 1 implementation with **in-memory storage**
- Data resets when the server restarts
- No authentication/authorization in this phase
