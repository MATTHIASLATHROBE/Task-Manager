import {
    createUser,
    loginUser,
    logoutUser,
    getUser,
    deleteUser,
    updateProfile,
    uploadProfilePhoto
} from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";

import {verifyToken} from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getUser);
router.post("/logout", logoutUser);
router.delete("/:id", verifyToken, deleteUser);
router.put("/profile", verifyToken, updateProfile);

router.put(
    "/profile/photo",
    verifyToken,
    upload.single("profilePhoto"),
    uploadProfilePhoto
);
    

export default router;
    