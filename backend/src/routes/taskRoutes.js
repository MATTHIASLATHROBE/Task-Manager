import {createTask, getTasks, getTaskById, updateTask, toggleTaskCompletion, deleteTask, deleteCompletedTasks} from "../controllers/taskController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/tasks", verifyToken, createTask);
router.get("/tasks", verifyToken, getTasks);
router.get("/tasks/:id", verifyToken, getTaskById);
router.put("/tasks/:id", verifyToken, updateTask);
router.patch("/tasks/:id/complete", verifyToken, toggleTaskCompletion);
router.delete("/tasks/completed", verifyToken, deleteCompletedTasks);
router.delete("/tasks/:id", verifyToken, deleteTask);


export default router;