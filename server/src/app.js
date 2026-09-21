import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
// import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

// Middleware
//

const allowedOrigins = [
  "http://localhost:5173",
  "https://hostel-management-system-one-chi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("REQUEST ORIGIN:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("BLOCKED ORIGIN:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Hostel Management API 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/rules", ruleRoutes);
app.use("/api/admin/reports", reportRoutes);

// app.use(errorMiddleware);

export default app;
