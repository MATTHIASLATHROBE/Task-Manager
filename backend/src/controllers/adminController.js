
import User from "../models/Users.js";
import Task from "../models/Task.js";

// Get all registered users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        const usersWithTaskCount = await Promise.all(
            users.map(async (user) => {
                const taskCount = await Task.countDocuments({
                    user: user._id
                });

                return {
                    ...user.toObject(),
                    taskCount
                };
            })
        );

        res.status(200).json({
            message: "Users fetched successfully",
            count: usersWithTaskCount.length,
            users: usersWithTaskCount
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
        const userId = req.params.id;

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

// Get overall admin dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const totalTasks = await Task.countDocuments();

        const completedTasks = await Task.countDocuments({
            done: true
        });

        const pendingTasks = await Task.countDocuments({
            done: false
        });

        res.status(200).json({
            message: "Dashboard statistics fetched successfully",
            stats: {
                totalUsers,
                totalTasks,
                completedTasks,
                pendingTasks
            }
        });

    } catch (error) {
        console.error("Error fetching dashboard statistics:", error);

        res.status(500).json({
            message: "Error fetching dashboard statistics"
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the account we want to delete
        const userToDelete = await User.findById(id);

        if (!userToDelete) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Prevent deletion of admin accounts
        if (userToDelete.isAdmin) {
            return res.status(403).json({
                message: "Admin accounts cannot be deleted"
            });
        }

        // Check who is making the request
        if (
            !req.user.isAdmin &&
            req.user._id.toString() !== id
        ) {
            return res.status(403).json({
                message: "You are not authorized to delete this account"
            });
        }

        // Delete all tasks belonging to this user
        await Task.deleteMany({ user: id });

        // Delete the user account
        await User.findByIdAndDelete(id);

        // Clear cookie if the user deleted their own account
        if (req.user._id.toString() === id) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
        }

        return res.status(200).json({
            message: "Account deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error deleting account"
        });
    }
};

export {
    getAllUsers,
    getUserDetails,
    getUserTasks,
    getDashboardStats,
    deleteUser
};


