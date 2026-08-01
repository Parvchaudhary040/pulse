# 🚀 Pulse - AI Powered Project Management Platform

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-yellow)

Pulse is a modern project management platform that helps teams organize projects, manage tasks, and collaborate efficiently. It features secure authentication, Role-Based Access Control (RBAC), AI-powered workspace insights, and a responsive dashboard.

## ✨ Features

- 🔐 JWT Authentication
- 🌐 Google & GitHub OAuth
- 👥 Role-Based Access Control (Owner, Admin, Manager, Member, Viewer)
- 📁 Project Management
- ✅ Task Management
- 📊 Interactive Dashboard & Analytics
- 🤖 AI Workspace Insights
- 👤 User Profile & Settings
- 🎨 Responsive Modern UI

## 🛠 Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Passport.js
- Google OAuth
- GitHub OAuth

## 🚀 Run with Docker

### Prerequisites

- Docker Desktop

### Clone the repository

```bash
git clone https://github.com/yourusername/pulse.git

cd pulse
```

### Start the application

```bash
docker compose up --build
```

Open:

- Frontend → http://localhost:3000
- Backend → http://localhost:5000

## 📸 Live Demo

<a href="" target="_blank">
  <img src="/public/landingpage.png" alt="Preview" width="100%">
</a>

## 🔒 Role Permissions

| Role | Access |
|------|--------|
| 👑 Owner | Full Access |
| 🛡 Admin | Manage Users, Projects & Tasks |
| 📋 Manager | Manage Projects & Tasks |
| 👤 Member | Manage Assigned Tasks |
| 👀 Viewer | Read Only |

## 🌐 Live Demo

**Frontend:** https://your-frontend-url.vercel.app

**Backend:** https://your-backend-url.onrender.com

## Deployment (Neon, Render, and Vercel)

1. Create a Neon database and run [`database/schema.sql`](database/schema.sql) in the Neon SQL editor.
2. Create a Render Blueprint from this repository. [`render.yaml`](render.yaml) builds and runs the backend service.
3. In Render, set `DATABASE_URL` to Neon's pooled connection string. Set `FRONTEND_URL` and `CORS_ORIGINS` to your Vercel URL, then configure both OAuth callback URLs with your Render API URL.
4. Import this repository into Vercel with `frontend` as the Root Directory. Set `VITE_API_URL` to `https://YOUR-RENDER-SERVICE.onrender.com/api` for Production, Preview, and Development. Optionally set `VITE_APP_URL` to your canonical Vercel URL for QR codes; otherwise the QR code uses the current deployed URL. [`frontend/vercel.json`](frontend/vercel.json) keeps React routes working after a page refresh.

For local Docker, no Neon credentials are required: Compose starts PostgreSQL and explicitly disables database TLS. Copy `backend/.env.example` only when local OAuth secrets are needed; keep `DATABASE_URL` empty while using the Docker database.

## 👨‍💻 Author

**Parv Chaudhary**

- GitHub: https://github.com/Parvchaudhary040
- LinkedIn: https://www.linkedin.com/in/parv-chaudhary-6690pc/
