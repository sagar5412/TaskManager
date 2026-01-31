# Task Management Application

A full-stack Task Management Web Application with CRUD operations for creating, viewing, updating, and deleting tasks.

![Task Manager](https://img.shields.io/badge/Status-Complete-green)

## 🚀 Features

- **Create Tasks** - Add new tasks with title, description, and status
- **View Tasks** - See all tasks in a clean, organized list
- **Update Tasks** - Edit task details or change status
- **Delete Tasks** - Remove tasks with confirmation
- **Filter Tasks** - Filter by status (All, Pending, In Progress, Completed)
- **Statistics Dashboard** - Real-time task counts by status
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend  | Node.js, Express.js               |
| Database | MongoDB (Atlas)                   |
| Styling  | Custom CSS with modern design     |

## 📁 Project Structure

```
simple_crud/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   ├── controllers/
│   │   └── taskController.js  # CRUD logic
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env                   # Environment variables
├── frontend/
│   ├── index.html             # Main HTML
│   ├── styles.css             # Styling
│   └── app.js                 # Frontend logic
└── README.md
```

## 📋 API Endpoints

| Method   | Endpoint         | Description     |
| -------- | ---------------- | --------------- |
| `GET`    | `/api/tasks`     | Get all tasks   |
| `GET`    | `/api/tasks/:id` | Get task by ID  |
| `POST`   | `/api/tasks`     | Create new task |
| `PUT`    | `/api/tasks/:id` | Update task     |
| `DELETE` | `/api/tasks/:id` | Delete task     |

### Request/Response Examples

**Create Task**

```json
POST /api/tasks
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "in-progress"
}
```

**Response**

```json
{
  "_id": "...",
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "in-progress",
  "createdAt": "2025-01-31T...",
  "updatedAt": "2025-01-31T..."
}
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd simple_crud
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Edit `backend/.env` file:

```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### 4. Start the Backend Server

```bash
npm run dev
```

Server runs at: `http://localhost:5000`

### 5. Open Frontend

Open `frontend/index.html` in your browser, or use Live Server extension in VS Code.

## 📊 Task Schema

| Field       | Type   | Required | Default   |
| ----------- | ------ | -------- | --------- |
| title       | String | Yes      | -         |
| description | String | No       | ""        |
| status      | Enum   | No       | "pending" |

**Status Options:** `pending`, `in-progress`, `completed`

## 🎨 Screenshots

The application features:

- Clean white theme with modern UI
- Real-time statistics dashboard
- Filter tabs for task status
- Modal forms for add/edit operations
- Toast notifications for feedback
- Fully responsive design

## 👤 Author

Full Stack Development Internship - Skill Assessment Assignment

## 📄 License

ISC
