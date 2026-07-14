import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controller/authController.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", isAuthenticated, getProfile);

export default router;
