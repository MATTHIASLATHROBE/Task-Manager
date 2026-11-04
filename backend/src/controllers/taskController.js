import Task from "../models/Task.js";

const createTask = async (req, res) => {
    try{
        const { taskName, description, note} = req.body;
        const user = req.user._id;

        const task = new Task({taskName, description, note, user});
        await task.save();

        res.status(201).json({ message: "Task created successfully", task: {taskName: task.taskName, description: task.description, note: task.note, done: task.done} });
    }
    catch(err){
        res.status(500).json({ message: "Error creating task" });
        console.error(err);
    }
}

const getTasks = async (req, res) => {
    try{
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "Please Create A Task" });
        }

        res.status(200).json({ message: "Tasks fetched successfully", tasks });
    }
    catch(err){
        res.status(500).json({ message: "Error fetching tasks" });
        console.error(err);
    }
}

const getTaskById = async (req, res) => {
    try{
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task fetched successfully", task });
    }
    catch(err){
        res.status(400).json({ message: "Error fetching task" });
        console.error(err);
    }
}

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Validate the submitted fields before changing the task.
    const { taskName, description, note, done } = req.body;

    if (
      taskName !== undefined &&
      (typeof taskName !== "string" || !taskName.trim())
    ) {
      return res.status(400).json({
        message: "Please provide a valid task name.",
      });
    }

    for (const [field, value] of Object.entries({ description, note })) {
      if (value !== undefined && typeof value !== "string") {
        return res.status(400).json({
          message: `${field} must be a string.`,
        });
      }
    }

    // Apply only fields the client submitted.
    if (taskName !== undefined) task.taskName = taskName.trim();
    if (description !== undefined) task.description = description;
    if (note !== undefined) task.note = note;


    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error updating task" });
  }
};

const toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.done = !task.done;
    await task.save();

    return res.status(200).json({
      message: "Task completion updated",
      task,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error updating task completion" });
  }
};

const deleteTask = async (req, res) => {
    try{
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).send({ message: "Task deleted successfully" });
    }
    catch(err){
        res.status(400).json({ message: "Error deleting task" });
        console.error(err);
    }
}

const deleteCompletedTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({
      user: req.user._id,
      done: true,
    });

    return res.status(200).json({
      message: "Completed tasks deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error deleting completed tasks",
    });
  }
};

export { createTask, getTasks, getTaskById, updateTask, toggleTaskCompletion, deleteTask, deleteCompletedTasks };