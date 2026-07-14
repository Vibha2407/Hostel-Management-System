import express from "express";

import {
  createRule,
  getAllRules,
  getRule,
  updateRule,
  deleteRule,
} from "../controller/ruleController.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllRules);
router.get("/:id", getRule);

// Admin
router.post("/", isAuthenticated, isAdmin, createRule);
router.put("/:id", isAuthenticated, isAdmin, updateRule);
router.delete("/:id", isAuthenticated, isAdmin, deleteRule);

export default router;
