import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000

const connectDB = async (app) => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");

        app.listen(PORT, 
            console.log(`Server running in development mode on  http://localhost:${PORT}`)
        );  
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;