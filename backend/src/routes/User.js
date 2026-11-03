import {createUser, loginUser, logoutUser, getUser} from "../controllers/User.js";
import {verifyToken} from "../middleware/AuthJWT.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getUser);
router.post("/logout", logoutUser);
    

export default router;
    