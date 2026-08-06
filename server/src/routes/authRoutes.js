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

// Get logged-in user's profile
router.get("/profile", isAuthenticated, getProfile);

// Update logged-in user's profile
// router.put("/profile", isAuthenticated, updateProfile);

export default router;
