import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import UserRouter from "./routes/user.js";
import TaskRouter from "./routes/task.js";
import protect from './middleware/authMiddleware.js';



const app=express();

app.use(cors({origin: "https://task-manager-ebon-nine-66.vercel.app" , credentials:true ,}));  //allows cookie and authentication headers to be sent
app.use(cookieParser()) //Because we are using cookie
app.use(express.json()); //parses form data (like HTML form submissions) into a JavaScript object.
app.use(express.urlencoded({extended:false})); //Parses JSON request body into JavaScript object.


//login , signup
app.use('/api/user',UserRouter);

//task related
app.use('/api/task',protect,TaskRouter);

export default app;