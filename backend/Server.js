import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://10.207.15.233:5173'
    ],
    credentials: true
}));

app.get("/",(req,res)=>{
    res.send("Task Manager API is running...")
})

app.use("/api/auth/users", userRoutes);  
app.use("/api/", taskRoutes);

connectDB(app);
