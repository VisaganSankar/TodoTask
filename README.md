# ✅ Todo Task Manager Web App

A full-stack **Task Management Web App** built for the Katomaran Hackathon, with Google and manual login support. Users can manage their tasks securely with full CRUD operations — personalized per user.

## 🌟 Features

### 🔐 Authentication
- ✅ Google Sign-In with Firebase
- ✅ Manual login with username/email + password
- ✅ User sessions stored using `localStorage`

### 📋 Task Management
- ✅ Add, edit, delete, and complete tasks
- ✅ Per-user task list (only your tasks are shown)
- ✅ Filter tasks: All / Completed / Pending
- ✅ Task title editing with inline save/cancel
- ✅ Real-time UI updates

### 🎨 User Experience
- ✅ Neon-themed responsive design
- ✅ Mobile-optimized UI
- ✅ Save/Cancel animations for edits
- ✅ Logout button with user info display

---

## 📺 Demo

🔗 Frontend (Vercel): [https://your-vercel-app.vercel.app](#)

🔗 Backend (Render): [https://your-render-app.onrender.com](#)

---

## 💻 Tech Stack

| Layer       | Tech                      |
|-------------|---------------------------|
| Frontend    | React, HTML, CSS, Axios   |
| Backend     | Node.js, Express.js       |
| Database    | MongoDB Atlas             |
| Auth        | Firebase (Google OAuth), Custom login |
| Hosting     | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure
project-root/
├── backend/ # Express.js + MongoDB backend
│ ├── models/ # Mongoose models (User, Task)
│ └── server.js # Main API and routes
│
├── frontend/ # React client app
│ ├── src/ # React components
│ └── public/ # Static assets
│
├── README.md # You're reading it!
└── .gitignore


---

## 🚀 Getting Started (Local Development)

### 🔧 Prerequisites
- Node.js & npm
- MongoDB Atlas URI
- Firebase Project with Google Sign-In enabled

### 🔨 Backend Setup

cd backend
npm install
# Add your MongoDB URI in server.js or use a .env file
nodemon server.js

🌐 Frontend Setup

Copy code
cd frontend
npm install
npm start

🌍 Deployment Guide

🔹 Backend (Render)
Go to Render

Create new web service → connect to GitHub backend repo

Set build command: npm install

Set start command: node server.js

Add environment variable if needed (MONGO_URI)


🔹 Frontend (Vercel)

Go to Vercel

Import project from GitHub frontend repo

Set build command: npm run build

Set output directory: build/


🔑 Firebase Configuration

In frontend/src/firebase.js:

js
Copy code
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project.firebaseapp.com",
  ...
};

🎯 Hackathon Criteria Covered

Criteria	✅
Google Sign-In Auth	✅
Manual Login & Register	✅
Task Add/Edit/Delete	✅
Filtering by Completion	✅
Mobile Responsive UI	✅
Attractive Button + Animations	✅
Logged-in user task filtering	✅

🧪 Testing
The app includes mock data for demonstration purposes. When you first launch the app and sign in, you'll see sample tasks that showcase all the features.

##Demo Video https://ik.imagekit.io/f1aiydani/Screen%20Recording%202025-06-29%20222413.mp4?updatedAt=1751217473843

This project is a part of a hackathon run by https://www.katomaran.com
