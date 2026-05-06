# 📝 Task Manager

A full-stack task management app built with the MERN stack.

## 🔗 Live Demo
[task-manager-ebon-nine-66.vercel.app](https://task-manager-ebon-nine-66.vercel.app)

## ✨ Features

- 🔐 **Create Account** — Register with your name, email and password
- 🔒 **Secure Password** — Passwords are encrypted using bcrypt
- 📊 **Dashboard** — Login to view and manage all your tasks
- ➕ **Create Task** — Add tasks with:
  - Title & Description
  - Due Date
  - Priority — Low / Medium / High
  - Status — Pending / Completed
- ✏️ **Edit & Delete** — Update or remove tasks anytime
- 📱 **Fully Responsive** — Works on mobile, tablet and desktop

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|---|---|---|
| React + Vite | Node.js + Express | MongoDB Atlas |
| Tailwind CSS | JWT Auth | Mongoose |

## 🚀 Getting Started

### Clone the repo
```bash
git clone https://github.com/Suhani-01/Task-Manager.git
```

## ⚡Backend
Open Terminal : 
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```
### ⚠️ For Local Development
 
In your backend `backedn/src/app.js`, update CORS to allow localhost:
 
```js
app.use(cors({
  origin: ["https://your-deployed-frontend.vercel.app", "http://localhost:5173"],
  credentials: true,
}));
```
 
Terminal :
```bash
npm run dev
```

## ⚡Frontend
Open a new Terminal :

```bash
cd frontend
npm install
```

Create a `.env` file in the `client` folder:
 
```env
VITE_API_URL=http://localhost:5000
```
 
Terminal :
```bash
npm run dev
```


## 📂 Frontend Structure
```text
frontend/
├── public/              # Static assets (favicons, manifest)
├── src/
│   ├── assets/          # Images (includes login page left image)
│   ├── components/      # Reusable UI building blocks
│   │   ├── ActiveComponent   # Dynamic view wrapper for main-page
│   │   ├── CalculateDue      # returns -[overdue,Due Today,Completed,x-days left]
│   │   ├── EditTask          # Task Edit component
│   │   ├── Stats             # Tasks Stats
│   │   ├── Logout            # Button with func
│   │   ├── Navbar            # landing pg navbar
│   │   └── TaskTable         # Shows Tasks component
│   ├── hooks/           # Custom React hooks ( -> useUpdateTaskStatus)
│   ├── mainpage-views/  # Sub-pages rendered within the MainPage shell
│   │   ├── AddTask           # Task creation form
│   │   ├── Dashboard         # Overview with stats
│   │   ├── Profile           # user Profile
│   │   ├── MyTasks           # Tasks
│   │   └── Pending           # Filtered view for incomplete tasks
│   ├── pages/           # High-level route pages ( Landing, Login, MainPage , SignUp)
│   ├── App.jsx          # Main application component & routing
│   ├── main.jsx         # Entry point for React
│   └── index.css        # Global styles and Tailwind directives
├── .env                 # Environment variables (API URL)
└── package.json         # Project dependencies and scripts