import express from "express";
import { createPayment } from "../controller/paymentController.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import {
  getReceipt,
  getAllPayments,
  updatePaymentStatus,
  syncExistingPayments,
} from "../controller/paymentController.js";

const router = express.Router();

router.post("/", isAuthenticated, createPayment);
router.get("/", isAuthenticated, getAllPayments);
router.get("/receipt/:id", isAuthenticated, getReceipt);
router.patch("/status/:id", isAuthenticated, isAdmin, updatePaymentStatus);
router.post("/sync-existing", isAdmin, syncExistingPayments);
// Sync old bookings to payments

export default router;
