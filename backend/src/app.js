import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import UserRouter from "./routes/user.js";
import TaskRouter from "./routes/task.js";
import protect from './middleware/authMiddleware.js';

const app = express();

// --- Middleware ---

// CORS: Configured for specific frontend origin and cookie support
app.use(cors({ 
    origin: ["http://localhost:5173", "https://task-manager-ebon-nine-66.vercel.app"], 
    credentials: true  //Enables cross-origin cookie sharing.
}));

// Parse cookies from request → available in req.cookies
app.use(cookieParser());

// Parse JSON body → available in req.body
app.use(express.json());

// Parse form (urlencoded) data → available in req.body
app.use(express.urlencoded({ extended: false }));


// --- Routes ---

// Public routes (Login/Signup)
app.use('/api/user', UserRouter);

// Protected routes: Requires authentication middleware
app.use('/api/task', protect, TaskRouter);

export default app;