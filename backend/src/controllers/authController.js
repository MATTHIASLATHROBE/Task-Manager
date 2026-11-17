import User from "../models/Users.js";
import Task from "../models/Task.js";
import { userToken } from "../middleware/authMiddleware.js";

const createUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email: normalizedEmail, password });
        await newUser.save();

        const token = userToken(newUser);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.status(201).json({ message: "User created successfully", user: {name: newUser.name, email: newUser.email} });
    }


    catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "Please provide email and password" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = userToken(user);
        

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.status(200).json({ message: "Login successful", user: {name: user.name, email: user.email}, token });
    }
    catch(error){
        res.status(400).json({message: "Error logging in user"});
        console.error(error);
    }
}

const logoutUser = (req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.status(200).send({ message: "User logged out successfully" });
    }
    catch(error){
        res.status(400).json({message: "Error logging out user"});
        console.error(error);
    }
}

const getUser = async (req, res) => {
        try{
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch(error){
        res.status(400).json({message: "Error fetching user"});
        console.error(error);
    }
}


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


const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check whether another account uses this email
        const existingUser = await User.findOne({
            email: normalizedEmail,
            _id: { $ne: req.user._id }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email is already in use"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name.trim(),
                email: normalizedEmail
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error updating profile"
        });
    }
};

export { createUser, loginUser, logoutUser, getUser, deleteUser, updateProfile };
