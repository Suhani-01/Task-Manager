import Task from "../models/Task.js";

// GET /api/tasks
export const getTask = async (req, res) => {
    try {
        const { id } = req.user; // logged-in user id (from auth middleware)

        // Example: /api/tasks?status=pending
        const { status } = req.query; // query param to filter tasks

        
        let filter = { userId: id }; // base filter → only user's tasks

        // Agar status query aaya toh filter mein add karo
        if (status === 'overdue') {
            // Overdue = due date pehle ki ho AND completed nahi hua
            filter.dueDate = { $lt : new Date() }; // tasks with dueDate < today
            filter.status = 'pending'; // still not completed

        } else if (status === 'pending') {
            filter.status = 'pending'; // only pending tasks

        } else if (status === 'completed') {
            filter.status = 'completed'; // only completed tasks
        }

        // Agar koi status nahi aaya → saare tasks aayenge (All Tasks tab)
        const tasks = await Task.find(filter).sort({ createdAt: -1 }); // latest tasks first
        return res.json(tasks);

    } catch (err) {
        return res.status(500).json({ message: err.message }); // server error
    }
}

// POST → create new task
export const createTask=async(req,res)=>{
    try{
        const task=await Task.create({...req.body,userId:req.user.id}); // attach userId to task

        //create task and return the task
        return res.status(201).json(task); // 201 = created
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

// GET /stats → task counts
export const getStats=async(req,res)=>{
    try{
        const userId=req.user.id; // current user

        const now=new Date(); // current time (for overdue)

        // run all count queries in parallel (faster)
        const [total , pending , completed , overdue]=await Promise.all([
            Task.countDocuments({userId}), // total tasks
            Task.countDocuments({userId,status:'pending'}), // pending count
            Task.countDocuments({userId,status:'completed'}), // completed count
            Task.countDocuments({userId,dueDate:{$lt:now},staus:'pending'}), // overdue tasks
        ]);

        return res.json({total,pending,completed,overdue}); // send stats

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

// PUT/PATCH → update full task
export const updateTask=async(req,res)=>{
    try{
        const task=await Task.findOneAndUpdate(
            {_id:req.params.id , userId:req.user.id}, // ensure task belongs to user
            req.body, // update fields from request
            {new:true} //return updated task
        );

        if(!task) return res.status(404).json({message:"Task not found"});
        return res.status(200).json(task); // updated task
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

// PATCH → update only status
export const updateStatus=async(req,res)=>{
    try{
        const task=await Task.findOneAndUpdate(
            {_id:req.params.id , userId:req.user.id}, // secure by user
            {status:req.body.status}, // update only status field
            {new:true}, // return updated doc
        );
        return res.status(200).json(task);
    }catch(err){
        return res.status(500).json({message:err.message});
    }

}


// DELETE → remove task
// To delete task /api/task:id
export const deleteTask=async(req,res)=>{
    try{
        const del=await Task.findOneAndDelete({_id:req.params.id , userId:req.user.id}); // delete only user's task
         if (!del) {
      return res.status(404).json({ message: "Task not found" });
    }

        return res.status(200).json({message:"Task deleted"}); // success message
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}