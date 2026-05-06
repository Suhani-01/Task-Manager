import { Router } from "express";
import { createTask, deleteTask, getStats, getTask, updateStatus, updateTask } from "../controllers/tasks.js";

const router=Router();

//GET tasks according to query -['pending' , 'overdue' , 'completed']
router.get('/',getTask);

//POST create new task
router.post('/',createTask);

//GET stats
router.get('/stats',getStats);

//POST : update the Task
router.post('/update/:id',updateTask);

router.post('/update-status/:id',updateStatus);

router.delete('/delete/:id',deleteTask);

export default router;
