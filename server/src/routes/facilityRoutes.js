import express from "express";

import {
  createFacility,
  getAllFacilities,
  getFacility,
  updateFacility,
  deleteFacility,
} from "../controller/facilityController.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllFacilities);
router.get("/:id", getFacility);

// Admin
router.post("/", isAuthenticated, isAdmin, createFacility);
router.put("/:id", isAuthenticated, isAdmin, updateFacility);
router.delete("/:id", isAuthenticated, isAdmin, deleteFacility);

export default router;
