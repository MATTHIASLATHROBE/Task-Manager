import express from "express"
import connectDB from "./src/config/db.js";

const app = express();

app.get("/",(req,res)=>{
    res.send("Task Manager API is running...")
})
connectDB(app);

