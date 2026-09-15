import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

export const getReports = async (req, res) => {
  try {
    // -----------------------------
    // BASIC COUNTS
    // -----------------------------

    const totalBookings = await Booking.countDocuments();

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalRooms = await Room.countDocuments();

    // -----------------------------
    // BOOKING STATUS
    // -----------------------------

    const bookingStatusData = await Booking.aggregate([
      {
        $group: {
          _id: "$bookingStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const bookings = {
      pending: 0,
      confirmed: 0,
      checkedIn: 0,
      checkedOut: 0,
      completed: 0,
      cancelled: 0,
    };

    bookingStatusData.forEach((item) => {
      switch (item._id) {
        case "Pending":
          bookings.pending = item.count;
          break;

        case "Confirmed":
          bookings.confirmed = item.count;
          break;

        case "Checked-In":
          bookings.checkedIn = item.count;
          break;

        case "Checked-Out":
          bookings.checkedOut = item.count;
          break;

        case "Completed":
          bookings.completed = item.count;
          break;

        case "Cancelled":
          bookings.cancelled = item.count;
          break;
      }
    });

    // -----------------------------
    // PAYMENT STATUS
    // -----------------------------

    const paymentStatusData = await Payment.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const payments = {
      pending: 0,
      success: 0,
      failed: 0,
      refunded: 0,
    };

    paymentStatusData.forEach((item) => {
      switch (item._id) {
        case "Pending":
          payments.pending = item.count;
          break;

        case "Success":
          payments.success = item.count;
          break;

        case "Failed":
          payments.failed = item.count;
          break;

        case "Refunded":
          payments.refunded = item.count;
          break;
      }
    });

    // -----------------------------
    // REVENUE
    // -----------------------------

    const revenueData = await Payment.aggregate([
      {
        $match: {
          paymentStatus: "Success",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // -----------------------------
    // REFUNDED AMOUNT
    // -----------------------------

    const refundData = await Payment.aggregate([
      {
        $match: {
          paymentStatus: "Refunded",
        },
      },
      {
        $group: {
          _id: null,
          totalRefunded: { $sum: "$amount" },
        },
      },
    ]);

    const totalRefunded = refundData[0]?.totalRefunded || 0;

    // -----------------------------
    // ROOM / BED OCCUPANCY
    // -----------------------------

    const roomData = await Room.aggregate([
      {
        $group: {
          _id: null,
          totalBeds: { $sum: "$totalBeds" },
          occupiedBeds: { $sum: "$occupiedBeds" },
        },
      },
    ]);

    const totalBeds = roomData[0]?.totalBeds || 0;
    const occupiedBeds = roomData[0]?.occupiedBeds || 0;
    const availableBeds = totalBeds - occupiedBeds;

    const occupancyRate =
      totalBeds > 0 ? Number(((occupiedBeds / totalBeds) * 100).toFixed(1)) : 0;

    // -----------------------------
    // BOOKING TREND - LAST 7 DAYS
    // -----------------------------

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    sevenDaysAgo.setHours(0, 0, 0, 0);

    const bookingTrend = await Booking.aggregate([
      {
        $match: {
          bookingDate: {
            $gte: sevenDaysAgo,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$bookingDate",
            },
          },
          bookings: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    // -----------------------------
    // FINAL RESPONSE
    // -----------------------------

    res.status(200).json({
      success: true,

      overview: {
        totalBookings,
        totalCustomers,
        totalRooms,
        totalRevenue,
        totalRefunded,
        occupancyRate,
      },

      bookings,

      payments,

      rooms: {
        totalRooms,
        totalBeds,
        occupiedBeds,
        availableBeds,
        occupancyRate,
      },

      bookingTrend,
    });
  } catch (error) {
    console.error("Reports Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate reports.",
      error: error.message,
    });
  }
};
