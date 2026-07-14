import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Room from "../models/Room.js";

export const createPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    //1.find booking

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    //2 Check if payment already exists
    const existingPayment = await Payment.findOne({
      booking: bookingId,
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already completed for this booking.",
      });
    }

    // 3. Generate Receipt Number
    // const receiptNumber = `REC-${Date.now()}`;
    const receiptNumber = `REC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 4. Create Payment
    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: booking.totalAmount,
      paymentMethod,
      transactionId: `TXN-${Date.now()}`,
      receiptNumber,
      paymentStatus: "Success",
    });

    // 5. Update Booking
    booking.paymentStatus = "Paid";
    booking.bookingStatus = "Confirmed";
    await booking.save();

    // 6. Response
    res.status(201).json({
      success: true,
      message: "Payment Successful",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReceipt = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: "booking",
        populate: {
          path: "room",
        },
      })
      .populate("user", "fullName email phone");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    res.status(200).json({
      success: true,
      receipt: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
