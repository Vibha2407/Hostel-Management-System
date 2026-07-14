import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  confirmBooking,
  checkInBooking,
  checkOutBooking,
} from "../controller/bookingController.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Customer creates booking
router.post("/", isAuthenticated, createBooking);

// Customer can see only their bookings
router.get("/my-bookings", isAuthenticated, getMyBookings);

// Admin can see all bookings
router.get("/", isAuthenticated, isAdmin, getAllBookings);

// cancel booking
router.put("/confirm/:id", isAuthenticated, isAdmin, confirmBooking);

router.put("/checkin/:id", isAuthenticated, isAdmin, checkInBooking);
router.put("/checkout/:id", isAuthenticated, isAdmin, checkOutBooking);
router.put("/cancel/:id", isAuthenticated, cancelBooking);

export default router;
