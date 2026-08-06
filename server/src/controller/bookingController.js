import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const createBooking = async (req, res) => {
  try {
    const {
      room,
      checkInDate,
      checkOutDate,
      bookingType,
      numberOfGuests,
      specialRequest,
    } = req.body;

    const selectedRoom = await Room.findById(room);

    if (!selectedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    // Check available beds
    const availableBeds = selectedRoom.totalBeds - selectedRoom.occupiedBeds;

    if (availableBeds <= 0) {
      return res.status(400).json({
        success: false,
        message: "Room is full.",
      });
    }

    if (numberOfGuests > availableBeds) {
      return res.status(400).json({
        success: false,
        message: "Not enough beds available.",
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    const totalDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    let totalAmount = 0;

    switch (bookingType) {
      case "Daily":
        totalAmount = totalDays * selectedRoom.pricePerDay;
        break;

      case "Weekly":
        totalAmount = Math.ceil(totalDays / 7) * selectedRoom.pricePerWeek;
        break;

      case "Monthly":
        totalAmount = Math.ceil(totalDays / 30) * selectedRoom.pricePerMonth;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid booking type.",
        });
    }

    const booking = await Booking.create({
      user: req.user._id,
      room,
      checkInDate,
      checkOutDate,
      bookingType,
      numberOfGuests,
      specialRequest,
      totalAmount,
      paymentStatus: "Paid",
      bookingStatus: "Confirmed",
      refundStatus: "Not Required",
    });

    // Update occupied beds only
    selectedRoom.occupiedBeds += Number(numberOfGuests);

    if (selectedRoom.occupiedBeds >= selectedRoom.totalBeds) {
      selectedRoom.status = "Full";
    } else {
      selectedRoom.status = "Available";
    }

    await selectedRoom.save();

    await booking.populate([
      {
        path: "user",
        select: "fullName email phone",
      },
      {
        path: "room",
        select: "roomNumber roomType sharingType",
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("room")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalBookings: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullName email phone")
      .populate("room")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalBookings: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled.",
      });
    }

    const room = await Room.findById(booking.room);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    // Prevent negative occupied beds
    room.occupiedBeds = Math.max(room.occupiedBeds - booking.numberOfGuests, 0);

    if (room.occupiedBeds < room.totalBeds) {
      room.status = "Available";
    } else {
      room.status = "Full";
    }

    await room.save();

    booking.bookingStatus = "Cancelled";
    booking.paymentStatus = "Refund Initiated";
    booking.refundAmount = booking.totalAmount;
    booking.refundStatus = "Completed";
    booking.refundDate = new Date();

    await booking.save();

    await booking.populate([
      {
        path: "room",
      },
      {
        path: "user",
        select: "fullName email phone",
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully. Refund completed.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// confirm booking
export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.bookingStatus !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be confirmed.",
      });
    }

    booking.bookingStatus = "Confirmed";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking confirmed successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkInBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.bookingStatus !== "Confirmed") {
      return res.status(400).json({
        success: false,
        message: "Only confirmed bookings can be checked in.",
      });
    }

    booking.bookingStatus = "Checked-In";
    booking.actualCheckIn = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Guest checked in successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkOutBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.bookingStatus !== "Checked-In") {
      return res.status(400).json({
        success: false,
        message: "Only checked-in guests can be checked out.",
      });
    }

    const room = await Room.findById(booking.room);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    // Update booking
    booking.bookingStatus = "Checked-Out";
    booking.actualCheckOut = new Date();

    await booking.save();

    // Update room
    room.occupiedBeds = Math.max(room.occupiedBeds - booking.numberOfGuests, 0);

    if (room.occupiedBeds < room.totalBeds) {
      room.status = "Available";
    } else {
      room.status = "Full";
    }

    await room.save();

    res.status(200).json({
      success: true,
      message: "Guest checked out successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
