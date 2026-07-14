import User from "../models/User.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalRooms = await Room.countDocuments();

    const availableRooms = await Room.countDocuments({
      status: "Available",
    });

    const fullRooms = await Room.countDocuments({
      status: "Full",
    });

    const maintenanceRooms = await Room.countDocuments({
      status: "Maintenance",
    });

    const totalBookings = await Booking.countDocuments();

    const confirmedBookings = await Booking.countDocuments({
      bookingStatus: "Confirmed",
    });

    const cancelledBookings = await Booking.countDocuments({
      bookingStatus: "Cancelled",
    });

    const pendingBookings = await Booking.countDocuments({
      bookingStatus: "Pending",
    });

    const payments = await Payment.find({
      paymentStatus: "Success",
    });

    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );

    res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalRooms,
        availableRooms,
        fullRooms,
        maintenanceRooms,

        totalBookings,
        confirmedBookings,
        cancelledBookings,
        pendingBookings,

        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
