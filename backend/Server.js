import express from "express"
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/User.js";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get("/",(req,res)=>{
    res.send("Task Manager API is running...")
})

app.use("/auth/users", userRoutes);  

connectDB(app);
