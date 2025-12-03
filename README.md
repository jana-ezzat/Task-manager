TaskFlow – Task Manager Web App

TaskFlow is a lightweight full-stack task management application built with Node.js, Express, and a React frontend.
It allows users to create, update, and delete tasks with a modern and intuitive UI.
No database is used — all tasks are stored in memory on the backend, making it perfect for demos, learning full-stack concepts, or small temporary projects.

🚀 Features
Frontend

Built with React + Vite / CRA (depends on your setup)

Modern UI with reusable components

Create, edit, delete, and mark tasks as completed

Responsive layout

Backend

Built with Node.js + Express

REST API for task management

Stores tasks in memory

Auto-resets data on server restart

📁 Project Structure
TaskFlow/
 ├── backend/
 │    ├── server.js
 │    ├── routes/
 │    ├── controllers/
 │    └── data/
 ├── frontend/
 │    ├── src/
 │    ├── public/
 │    └── package.json
 └── README.md

🛠️ Technologies Used
Frontend

React

TypeScript (if applicable)

TailwindCSS / custom styles

Axios / Fetch API

Backend

Node.js

Express.js

CORS

In-memory data storage (simple array/object)

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/TaskFlow.git
cd TaskFlow


Start the backend:

npm run dev


Backend runs on:
👉 http://localhost:3001 

Start the frontend:
cd frontend
npm start


Frontend runs on:
👉 http://localhost:8080

🔌 API Endpoints
GET api/tasks

Returns all tasks.

POST /tasks


PUT /tasks/:id

Updates a task.

DELETE /tasks/:id

Deletes a task.

⚠️ Important Notes

This design is intentional for simplicity and learning purposes.


This project is licensed under the MIT License.
