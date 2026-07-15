# 🚀 TaskFlow – Project & Team Task Management Platform

A full-stack Project and Team Task Management Platform developed as part of the CyphLab Intern Full Stack Developer practical assignment.

---

# 📌 Project Overview

TaskFlow is a role-based project management system that enables organizations to manage projects, assign tasks, collaborate with teams, and monitor project progress efficiently.

The platform supports three user roles:

- 👑 Administrator
- 📋 Project Manager
- 👨‍💻 Team Member

---

# ✨ Features

## Authentication

- Secure Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization

---

## Administrator

- Dashboard
- Manage Users
- Create Project Managers
- Create Team Members
- Edit Users
- Delete Users
- Change User Roles
- Manage Projects
- Manage Tasks

---

## Project Manager

- Create Projects
- Edit Projects
- Delete Projects
- Create Tasks
- Assign Team Members
- Edit Tasks
- Delete Tasks
- Update Task Status

---

## Team Member

- View Assigned Tasks
- View Projects
- Update Task Status
- Drag & Drop Kanban Board
- Add Comments

---

## Dashboard

- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks
- Task Status Charts
- Recent Tasks

---

## Kanban Board

- Drag & Drop Tasks
- TODO
- IN PROGRESS
- DONE

---

## User Management

- Create Users
- Edit Users
- Delete Users
- Role Management

---

## Comments

- Add Comments
- View Comments
- Delete Comments

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Axios
- React Hot Toast
- DnD Kit

---

## Backend

- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcrypt

---

## Database

- MySQL

---

# 📂 Project Structure

```
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── routes/
│   └── context/

backend/
│
├── controllers/
├── routes/
├── services/
├── middleware/
├── prisma/
└── config/
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
```

---

## Backend

```bash
cd backend
npm install
```

Create

```
.env
```

Run

```bash
npx prisma migrate dev

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Default Roles

- Administrator
- Project Manager
- Team Member

---

# 📊 Database

Built using Prisma ORM with relational database design.

Main Entities

- Users
- Roles
- Projects
- Tasks
- Comments

---

# 🔗 REST API

Authentication

```
POST /api/auth/login
GET /api/auth/me
```

Users

```
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
```

Projects

```
GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
```

Tasks

```
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
PATCH /api/tasks/:id/status
DELETE /api/tasks/:id
```

Comments

```
GET /api/tasks/:taskId/comments
POST /api/tasks/:taskId/comments
DELETE /api/comments/:id
```

Dashboard

```
GET /api/dashboard
```

---

# 📷 Screenshots

(Add screenshots here)

- Login
- Dashboard
- Projects
- Tasks
- Kanban
- Users

---

# 🤖 AI Assistance

AI tools used:

- ChatGPT (OpenAI)

AI assisted with:

- UI improvements
- React component generation
- Bug fixing
- Code refactoring
- Documentation
- Project polishing

All development decisions, testing, debugging, and final implementation were completed and verified by the developer.

---

# 👨‍💻 Developer

Developed by

**Deshan Premarathna**

University of Kelaniya

BICT (Hons) in Software Development

---

# 📄 License

Developed for the CyphLab Full Stack Developer Internship Practical Assignment.