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

    // Check Room
    const selectedRoom = await Room.findById(room);

    if (!selectedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    // Check Availability
    if (selectedRoom.availableBeds <= 0) {
      return res.status(400).json({
        success: false,
        message: "Room is full.",
      });
    }

    // Check Number of Guests
    if (numberOfGuests > selectedRoom.availableBeds) {
      return res.status(400).json({
        success: false,
        message: "Not enough beds available.",
      });
    }

    // Date Validation
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    // Calculate Duration
    const timeDifference = checkOut - checkIn;
    const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

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

    // Create Booking
    const booking = await Booking.create({
      user: req.user._id,
      room,
      checkInDate,
      checkOutDate,
      bookingType,
      numberOfGuests,
      specialRequest,
      totalAmount,
    });

    // Update Room
    selectedRoom.occupiedBeds += numberOfGuests;
    selectedRoom.availableBeds -= numberOfGuests;

    if (selectedRoom.availableBeds <= 0) {
      selectedRoom.status = "Full";
    }

    await selectedRoom.save();

    // Success Response
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

    // Prevent cancelling twice
    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled.",
      });
    }

    // Find Room
    const room = await Room.findById(booking.room);

    // Update Room
    room.occupiedBeds -= booking.numberOfGuests;
    room.availableBeds += booking.numberOfGuests;

    if (room.availableBeds > 0) {
      room.status = "Available";
    }

    await room.save();

    // Update Booking
    booking.bookingStatus = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
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
    room.occupiedBeds -= booking.numberOfGuests;
    room.availableBeds += booking.numberOfGuests;

    if (room.availableBeds > 0) {
      room.status = "Available";
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
