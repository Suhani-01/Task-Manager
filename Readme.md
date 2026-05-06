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

### Backend
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
## ⚠️ For Local Development
 
In your backend `backedn/src/app.js`, update CORS to allow localhost:
 
```js
app.use(cors({
  origin: ["https://your-deployed-frontend.vercel.app", "http://localhost:5173"],
  credentials: true,
}));
```
 

```bash
npm run dev
```

### Frontend
Open a new Terminal and type :

```bash
cd frontend
npm install
```

Create a `.env` file in the `client` folder:
 
```env
VITE_API_URL=http://localhost:5000
```
 
```bash
npm run dev
```