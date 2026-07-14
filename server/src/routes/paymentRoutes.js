import express from "express";
import { createPayment } from "../controller/paymentController.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getReceipt } from "../controller/paymentController.js";

const router = express.Router();

router.post("/", isAuthenticated, createPayment);
router.get("/receipt/:id", isAuthenticated, getReceipt);

export default router;
