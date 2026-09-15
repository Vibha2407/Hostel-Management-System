import express from "express";

import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  resolveComplaint,
  assignComplaint,
} from "../controller/complaintController.js";

import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
// import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Customer: raise a complaint
router.post("/", isAuthenticated, createComplaint);

// Customer: get own complaints
router.get("/my", isAuthenticated, getMyComplaints);

// Admin: get all complaints
router.get("/all", isAuthenticated, isAdmin, getAllComplaints);

// Admin: resolve a complaint
router.patch("/:id/resolve", isAuthenticated, isAdmin, resolveComplaint);
// Assign complaint / mark as in progress
router.patch("/:id/assign", isAuthenticated, isAdmin, assignComplaint);

export default router;
