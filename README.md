# GitHub Projects CRM

A simple full-stack CRM system that allows users to manage public GitHub repositories.  
This app was created as a test assignment using **React**, **Node.js**, **PostgreSQL**, and **MongoDB**.

---

## 🔧 Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Ant Design
- **Backend:** Node.js, Express, TypeScript
- **Databases:** 
  - **MongoDB** — for user authentication
  - **PostgreSQL** — for storing GitHub project metadata
- **ORM:** Sequelize (PostgreSQL), Mongoose (MongoDB)
- **Auth:** JWT token
- **Containerization:** Docker, Docker Compose

---

## 📦 Features

- ✅ User registration & login (JWT-based auth)
- ✅ GitHub repository parsing (via GitHub API)
- ✅ Save and display:
  - Owner
  - Repo name
  - Stars ⭐
  - Forks 🍴
  - Issues 🐞
  - Created at 🕒 (Unix UTC)
- ✅ Update/delete project entries
- ✅ Responsive & styled UI with Ant Design
- ✅ Loading states and error handling
- ✅ Fully dockerized setup

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- Docker + Docker Compose

### 1. Clone the repo

```bash
git clone https://github.com/your-username/github-projects-crm.git
cd github-projects-crm
```

### 2. Start with Docker
docker-compose up --build

```bash
Server: http://localhost:5000
Client: http://localhost:5173
```

### 🗂️ Folder Structure
```bash
/client               -> React frontend (Vite)
/client/src           -> Pages & components
/server               -> Node backend (Express)
/server/src/routes    -> API endpoints
/server/src/utils     -> DB connectors, JWT
```

### 🌐 API Example
```bash
Register:

POST /auth/register
Content-Type: application/json

{
  "email": "test@mail.com",
  "password": "123456"
}

Login:
POST /auth/login
Content-Type: application/json

{
  "email": "test@mail.com",
  "password": "123456"
}

Response:

{
  "token": "..."
}
```

### Add Project && Get All Projects

```bash
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "path": "facebook/react"
}

GET /projects
Authorization: Bearer <token>
```

### 🧪 .env Example

```bash
PORT=5000
MONGO_URI=mongodb://mongo:27017/github_crm
POSTGRES_DB=github_crm
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
GITHUB_TOKEN=your_github_token
JWT_SECRET=your_jwt_secret
```

### Made by Bohdan ✌️
This is a test project built for a full-stack position.