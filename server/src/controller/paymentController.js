import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Room from "../models/Room.js";

const generateTransactionId = () => {
  return `TXN-${Date.now()}-${Math.floor(100000 + Math.random() * 900000)}`;
};

const generateReceiptNumber = () => {
  return `REC-${Date.now()}-${Math.floor(100000 + Math.random() * 900000)}`;
};

/* =========================================================
   CREATE PAYMENT
========================================================= */

export const createPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required.",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required.",
      });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const existingPayment = await Payment.findOne({
      booking: booking._id,
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already exists for this booking.",
        payment: existingPayment,
      });
    }

    const transactionId = generateTransactionId();
    const receiptNumber = generateReceiptNumber();

    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: Number(booking.totalAmount || 0),
      paymentMethod,
      transactionId,
      receiptNumber,
      paymentStatus: "Success",
      paymentDate: new Date(),
    });

    booking.paymentStatus = "Paid";
    booking.bookingStatus = "Confirmed";

    await booking.save();

    return res.status(201).json({
      success: true,
      message: "Payment Successful.",
      payment: {
        _id: payment._id,
        booking: payment.booking,
        user: payment.user,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        transactionId: payment.transactionId,
        receiptNumber: payment.receiptNumber,
        paymentStatus: payment.paymentStatus,
        paymentDate: payment.paymentDate,
      },
      booking: {
        _id: booking._id,
        user: booking.user,
        room: booking.room,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        bookingType: booking.bookingType,
        numberOfGuests: booking.numberOfGuests,
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
      },
    });
  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment.",
    });
  }
};

/* =========================================================
   GET ALL PAYMENTS - ADMIN
========================================================= */

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "fullName email phone")
      .populate(
        "booking",
        "checkInDate checkOutDate bookingType totalAmount bookingStatus paymentStatus",
      )
      .sort({ paymentDate: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("GET ALL PAYMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch payments.",
    });
  }
};

/* =========================================================
   UPDATE PAYMENT STATUS - ADMIN
========================================================= */

export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Payment status is required.",
      });
    }

    const allowedStatuses = ["Pending", "Success", "Failed", "Refunded"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status.",
      });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    payment.paymentStatus = status;

    await payment.save();

    /*
     * Keep booking payment status synchronized
     */

    if (payment.booking) {
      const booking = await Booking.findById(payment.booking);

      if (booking) {
        if (status === "Success") {
          booking.paymentStatus = "Paid";
          booking.bookingStatus = "Confirmed";
        } else if (status === "Refunded") {
          booking.paymentStatus = "Refunded";
        } else if (status === "Failed") {
          booking.paymentStatus = "Pending";
        } else if (status === "Pending") {
          booking.paymentStatus = "Pending";
        }

        await booking.save();
      }
    }

    const updatedPayment = await Payment.findById(paymentId)
      .populate("user", "name email phone")
      .populate(
        "booking",
        "checkInDate checkOutDate bookingType totalAmount bookingStatus paymentStatus",
      );

    return res.status(200).json({
      success: true,
      message: "Payment status updated successfully.",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("UPDATE PAYMENT STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update payment status.",
    });
  }
};

/* =========================================================
   GET PAYMENT RECEIPT
========================================================= */

export const getReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
      .populate("user", "name email phone")
      .populate(
        "booking",
        "checkInDate checkOutDate bookingType numberOfGuests totalAmount bookingStatus paymentStatus room",
      );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    /*
     * Customer can only see their own receipt.
     * Admin can see any receipt.
     */

    if (
      req.user.role !== "admin" &&
      payment.user?._id?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this receipt.",
      });
    }

    return res.status(200).json({
      success: true,
      receipt: {
        paymentId: payment._id,
        receiptNumber: payment.receiptNumber,
        transactionId: payment.transactionId,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        paymentStatus: payment.paymentStatus,
        paymentDate: payment.paymentDate,

        customer: payment.user,

        booking: payment.booking,
      },
    });
  } catch (error) {
    console.error("GET RECEIPT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch receipt.",
    });
  }
};

/* =========================================================
   SYNC EXISTING PAYMENTS
========================================================= */

export const syncExistingPayments = async (req, res) => {
  try {
    const bookings = await Booking.find({
      paymentStatus: "Paid",
    });

    let syncedCount = 0;

    for (const booking of bookings) {
      const existingPayment = await Payment.findOne({
        booking: booking._id,
      });

      if (existingPayment) {
        continue;
      }

      await Payment.create({
        booking: booking._id,
        user: booking.user,
        amount: Number(booking.totalAmount || 0),
        paymentMethod: "UPI",
        transactionId: generateTransactionId(),
        receiptNumber: generateReceiptNumber(),
        paymentStatus: "Success",
        paymentDate: booking.updatedAt || new Date(),
      });

      syncedCount++;
    }

    return res.status(200).json({
      success: true,
      message: "Existing payments synced successfully.",
      syncedCount,
    });
  } catch (error) {
    console.error("SYNC EXISTING PAYMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to sync existing payments.",
    });
  }
};
