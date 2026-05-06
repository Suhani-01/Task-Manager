import { Router } from "express";
import { createTask, deleteTask, getStats, getTask, updateStatus, updateTask } from "../controllers/tasks.js";

const router=Router(); // create router instance

//GET tasks according to query -['pending' , 'overdue' , 'completed']
router.get('/',getTask); // fetch tasks (can filter using query params)

//POST create new task
router.post('/',createTask); // create and save new task

//GET stats
router.get('/stats',getStats); // get task counts (total, pending, completed, overdue)

//POST : update the Task
router.post('/update/:id',updateTask); // update full task by id

router.post('/update-status/:id',updateStatus); // update only status field of task

router.delete('/delete/:id',deleteTask); // delete task by id

export default router; // export router to use in app