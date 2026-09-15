import express from "express";

import { getReports } from "../controller/reportController.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Reports
router.get("/", isAuthenticated, isAdmin, getReports);

export default router;
