import Task from "../models/Task.js";

// GET /api/tasks
export const getTask = async (req, res) => {
    try {
        const { id } = req.user;

        // Example: /api/tasks?status=pending
        const { status } = req.query;

        
        let filter = { userId: id };

        // Agar status query aaya toh filter mein add karo
        if (status === 'overdue') {
            // Overdue = due date pehle ki ho AND completed nahi hua
            filter.dueDate = { $lt : new Date() }; //dueDate less than current date
            filter.status = 'pending'; //status equal to pending 

        } else if (status === 'pending') {
            filter.status = 'pending';

        } else if (status === 'completed') {
            filter.status = 'completed';
        }

        // Agar koi status nahi aaya → saare tasks aayenge (All Tasks tab)
        const tasks = await Task.find(filter).sort({ createdAt: -1 }); // .fnd → .find (typo fix kiya)
        return res.json(tasks);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

//POST
export const createTask=async(req,res)=>{
    try{
        const task=await Task.create({...req.body,userId:req.user.id});

        //create task and return the task
        return res.status(201).json(task);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const getStats=async(req,res)=>{
    try{
        const userId=req.user.id;

        const now=new Date();

        const [total , pending , completed , overdue]=await Promise.all([
            Task.countDocuments({userId}),
            Task.countDocuments({userId,status:'pending'}),
            Task.countDocuments({userId,status:'completed'}),
            Task.countDocuments({userId,dueDate:{$lt:now},staus:'pending'}),
        ]);

        return res.json({total,pending,completed,overdue});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export const updateTask=async(req,res)=>{
    try{
        const task=await Task.findOneAndUpdate(
            {_id:req.params.id , userId:req.user.id},
            req.body,
            {new:true} //return updated task
        );

        if(!task) return res.status(404).json({message:"Task not found"});
        return res.status(200).json(task);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}


export const updateStatus=async(req,res)=>{
    try{
        const task=await Task.findOneAndUpdate(
            {_id:req.params.id , userId:req.user.id},
            {status:req.body.status},
            {new:true},
        );
        return res.status(200).json(task);
    }catch(err){
        return res.status(500).json({message:err.message});
    }

}


//To delete task /api/task:id
export const deleteTask=async(req,res)=>{
    try{
        const del=await Task.findOneAndDelete({_id:req.params.id , userId:req.user.id});
         if (!del) {
      return res.status(404).json({ message: "Task not found" });
    }

        return res.status(200).json({message:"Task deleted"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}