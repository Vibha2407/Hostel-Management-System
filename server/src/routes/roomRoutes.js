import express from "express";
import {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
  filterRooms,
} from "../controller/roomController.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, isAdmin, createRoom);
router.get("/", getAllRooms);
router.get("/filter", filterRooms);
router.get("/:id", getSingleRoom);
router.put("/:id", isAuthenticated, isAdmin, updateRoom);
router.delete("/:id", isAuthenticated, isAdmin, deleteRoom);

export default router;
