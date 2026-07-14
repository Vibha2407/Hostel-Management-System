import express from "express";

import { getCustomerDashboard } from "../controller/customerController.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, getCustomerDashboard);

export default router;
