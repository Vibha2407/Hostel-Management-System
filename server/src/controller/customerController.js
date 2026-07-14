import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";

export const getCustomerDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const bookings = await Booking.find({
      user: req.user._id,
    }).populate("room");

    const payments = await Payment.find({
      user: req.user._id,
    });

    const totalPayments = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );

    res.status(200).json({
      success: true,

      dashboard: {
        user,
        totalBookings: bookings.length,
        totalPayments,
        bookings,
        payments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
