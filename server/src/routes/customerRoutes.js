import express from "express";
import { updateProfile } from "../controller/authController.js";

import { getCustomerDashboard } from "../controller/customerController.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
// import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, getCustomerDashboard);
router.put("/profile", isAuthenticated, updateProfile);

export default router;
