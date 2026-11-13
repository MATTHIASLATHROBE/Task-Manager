import express from "express";
import {getAllUsers, getUserDetails, getUserTasks, getDashboardStats} from "../controllers/adminController.js";
import {verifyToken, verifyAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getAllUsers);

router.get("/users/:id", verifyToken, verifyAdmin, getUserDetails);

router.get("/users/:id/tasks", verifyToken, verifyAdmin, getUserTasks);

router.get("/dashboard/stats", verifyToken,verifyAdmin,getDashboardStats);

export default router;