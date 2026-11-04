import User from "../models/Users.js";
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

        const token = userToken(user._id);

        res.cookie('token', token,{
            httpOnly: true, 
            secure: false, 
            sameSite: true
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
            res.clearCookie('token',{
            httpOnly: true, 
            secure: false, 
            sameSite: true
        });;
        res.status(200).send({ message: "User logged out successfully" });
    }
    catch(error){
        res.status(400).json({message: "Error logging out user"});
        console.error(error);
    }
}

const getUser = async (req, res) => {
        try{
        const userId = req.user.id;
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

export { createUser, loginUser, logoutUser, getUser };
