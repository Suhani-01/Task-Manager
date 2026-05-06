import mongoose from "mongoose";

// Define schema (structure of task document)
const taskSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // reference to User model (relation)
        required:true, // task must belong to a user
    },
    title:{
        type:String,
        required:true, // task title is mandatory
    },
    description:{
        type:String // optional description
    },
    status:{
        type:String,
        enum:['pending','completed'], // allowed values only
        default:'pending', // default when task is created
    },
    priority:{
        type:String,
        enum:['low','medium','high'], // priority levels
        default:'medium', // default priority
    },
    dueDate:{
        type:Date,
        default:null // no due date by default
    }
},{
    timestamps:true, // adds createdAt & updatedAt
})

// Create model → used to interact with tasks collection
const Task=mongoose.model("Task",taskSchema);

export default Task; // export model