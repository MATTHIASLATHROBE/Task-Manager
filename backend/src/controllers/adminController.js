
import User from "../models/Users.js";
import Task from "../models/Task.js";

// Get all registered users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            message: "Users fetched successfully",
            count: users.length,
            users
        });

    } catch (error) {
        console.error("Error fetching users:", error);

        res.status(500).json({
            message: "Error fetching users"
        });
    }
};

// Get one user's details and task count
const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const taskCount = await Task.countDocuments({ user: userId });

        res.status(200).json({
            message: "User details fetched successfully",
            user,
            taskCount
        });

    } catch (error) {
        console.error("Error fetching user details:", error);

        res.status(500).json({
            message: "Error fetching user details"
        });
    }
};

// Get all tasks belonging to a selected user
const getUserTasks = async (req, res) => {
    try {
        const userId = req.params.id.trim();

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const tasks = await Task.find({ user: userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "User tasks fetched successfully",
            count: tasks.length,
            tasks
        });

    } catch (error) {
        console.error("Error fetching user tasks:", error);

        res.status(500).json({
            message: "Error fetching user tasks"
        });
    }
};

export {
    getAllUsers,
    getUserDetails,
    getUserTasks
};
