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
