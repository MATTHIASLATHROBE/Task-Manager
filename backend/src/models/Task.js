import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {type: String, required: true},
    description: {type: String},
    note: {type: String},
    done: {type: Boolean, default: false},
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
},
{
    timestamps: true
})

const Task = mongoose.model("Task", taskSchema);
export default Task;