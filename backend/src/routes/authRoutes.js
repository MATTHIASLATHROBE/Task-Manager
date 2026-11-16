import {createUser, loginUser, logoutUser, getUser, deleteUser} from "../controllers/authController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getUser);
router.post("/logout", logoutUser);
router.delete("/:id", verifyToken, deleteUser);
    

export default router;
    