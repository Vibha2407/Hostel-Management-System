import express from "express";
import { updateProfile } from "../controller/authController.js";

import {
  getCustomerDashboard,
  getAllCustomers,
  toggleCustomersStatus,
} from "../controller/customerController.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
// import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, getCustomerDashboard);
router.put("/profile", isAuthenticated, updateProfile);

// new admin?manage customer routes
router.get("/all", isAuthenticated, getAllCustomers);
router.patch("/:userId/status", isAuthenticated, toggleCustomersStatus);

export default router;
