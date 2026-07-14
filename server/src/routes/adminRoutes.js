import express from "express";

import { getDashboard } from "../controller/adminController.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, isAdmin, getDashboard);

export default router;
