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

// Get All Customer for manage customerrs
// export const getAllCustomers = async (req, res) => {
//   try {
//     const customers = await User.find({ role: { $ne: "admin" } })
//       .select("-password")
//       .populate("assignedRoom");
//     res.status(200).json({
//       success: true,
//       customers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getAllCustomers = async (req, res) => {
  try {
    // Get only actual customers
    const customers = await User.find({ role: "customer" })
      .select("-password")
      .lean();

    const customerIds = customers.map((customer) => customer._id);

    // Get all bookings belonging to these customers
    const bookings = await Booking.find({
      user: { $in: customerIds },
    })
      .populate("room", "roomNumber roomType sharingType")
      .sort({ createdAt: -1 })
      .lean();

    // Get all payments belonging to these customers
    const payments = await Payment.find({
      user: { $in: customerIds },
    })
      .sort({ paymentDate: -1 })
      .lean();

    const now = new Date();

    const enrichedCustomers = customers.map((customer) => {
      const customerBookings = bookings.filter(
        (booking) => String(booking.user) === String(customer._id),
      );

      const customerPayments = payments.filter(
        (payment) => String(payment.user) === String(customer._id),
      );

      // Current active stay
      const currentBooking = customerBookings.find((booking) => {
        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);

        return (
          ["Confirmed", "Checked-In"].includes(booking.bookingStatus) &&
          checkIn <= now &&
          checkOut > now
        );
      });

      // Latest booking
      const latestBooking = customerBookings[0] || null;

      // Latest payment
      const latestPayment = customerPayments[0] || null;

      return {
        ...customer,

        // Current room/stay information
        assignedRoom: currentBooking?.room || null,
        currentBooking: currentBooking || null,

        // Booking information
        totalBookings: customerBookings.length,
        bookingHistory: customerBookings,

        // Payment information
        totalPayments: customerPayments.reduce(
          (sum, payment) =>
            payment.paymentStatus === "Success" ? sum + payment.amount : sum,
          0,
        ),

        latestPayment: latestPayment || null,

        // Prefer current booking payment status,
        // otherwise latest booking status
        paymentStatus:
          currentBooking?.paymentStatus ||
          latestBooking?.paymentStatus ||
          "Pending",
      };
    });

    res.status(200).json({
      success: true,
      customers: enrichedCustomers,
    });
  } catch (error) {
    console.error("Get all customers error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Toggle Customer Status (Activate / Deactivate)
export const toggleCustomersStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const isActive =
      req.body && typeof req.body.isActive !== "undefined"
        ? req.body.isActive
        : false;
    // Default to true if not provided
    // const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { returnDocument: "after" },
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "Customer status updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
