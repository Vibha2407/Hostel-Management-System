// import cron from "node-cron";
// import Booking from "../models/Booking.js";
// import Room from "../models/Room.js";

// const releaseBeds = async (booking) => {
//   if (booking.bedsReleased) {
//     return;
//   }

//   const room = await Room.findById(booking.room);

//   if (!room) {
//     console.log(`Room not found for booking: ${booking._id}`);
//     return;
//   }

//   const newOccupiedBeds = Math.max(
//     room.occupiedBeds - booking.numberOfGuests,
//     0,
//   );

//   const newStatus = newOccupiedBeds >= room.totalBeds ? "Full" : "Available";

//   await Room.findByIdAndUpdate(
//     booking.room,
//     {
//       occupiedBeds: newOccupiedBeds,
//       status: newStatus,
//     },
//     {
//       returnDocument: "after",
//     },
//   );

//   booking.bedsReleased = true;
// };
// const cleanupBookings = async () => {
//   try {
//     const now = new Date();

//     // ==================================================
//     // 1. AUTO-CANCEL EXPIRED PENDING BOOKINGS
//     // ==================================================

//     const expiredPendingBookings = await Booking.find({
//       bookingStatus: "Pending",
//       confirmationDeadline: {
//         $ne: null,
//         $lte: now,
//       },
//     });

//     for (const booking of expiredPendingBookings) {
//       await releaseBeds(booking);

//       booking.bookingStatus = "Cancelled";

//       // Payment/refund handling
//       if (booking.paymentStatus === "Paid") {
//         booking.paymentStatus = "Refund Initiated";
//         booking.refundAmount = booking.totalAmount;
//         booking.refundStatus = "Completed";
//         booking.refundDate = now;
//       }

//       await booking.save();

//       console.log(`Auto-cancelled pending booking: ${booking._id}`);
//     }

//     // ==================================================
//     // 2. AUTO-COMPLETE CONFIRMED BOOKINGS
//     // ==================================================

//     const expiredConfirmedBookings = await Booking.find({
//       bookingStatus: "Confirmed",
//       checkOutDate: {
//         $lte: now,
//       },
//     });

//     for (const booking of expiredConfirmedBookings) {
//       await releaseBeds(booking);

//       booking.bookingStatus = "Completed";
//       booking.actualCheckOut = now;

//       await booking.save();

//       console.log(`Auto-completed booking: ${booking._id}`);
//     }

//     // ==================================================
//     // 3. AUTO CHECK-OUT CHECKED-IN BOOKINGS
//     // ==================================================

//     const expiredCheckedInBookings = await Booking.find({
//       bookingStatus: "Checked-In",
//       checkOutDate: {
//         $lte: now,
//       },
//     });

//     for (const booking of expiredCheckedInBookings) {
//       await releaseBeds(booking);

//       booking.bookingStatus = "Checked-Out";
//       booking.actualCheckOut = now;

//       await booking.save();

//       console.log(`Auto-checked-out booking: ${booking._id}`);
//     }
//   } catch (error) {
//     console.error("Booking cleanup error:", error.message);
//   }
// };

// // Run every 5 minutes
// cron.schedule("*/5 * * * *", cleanupBookings);

// export default cleanupBookings;
import cron from "node-cron";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

const releaseBeds = async (booking) => {
  // Already released → do nothing
  if (booking.bedsReleased) {
    return;
  }

  const room = await Room.findById(booking.room);

  if (!room) {
    console.log(`Room not found for booking: ${booking._id}`);
    return;
  }

  // Release the booked beds
  room.occupiedBeds = Math.max(room.occupiedBeds - booking.numberOfGuests, 0);

  // Update room status
  if (room.occupiedBeds < room.totalBeds) {
    room.status = "Available";
  } else {
    room.status = "Full";
  }

  await room.save();

  // Mark beds as released
  booking.bedsReleased = true;

  console.log(
    `Beds released for booking ${booking._id}. Available beds: ${
      room.totalBeds - room.occupiedBeds
    }`,
  );
};

const cleanupBookings = async () => {
  try {
    const now = new Date();

    // ==================================================
    // 1. AUTO-CANCEL EXPIRED PENDING BOOKINGS
    // ==================================================

    const expiredPendingBookings = await Booking.find({
      bookingStatus: "Pending",
      confirmationDeadline: {
        $ne: null,
        $lte: now,
      },
    });

    for (const booking of expiredPendingBookings) {
      await releaseBeds(booking);

      booking.bookingStatus = "Cancelled";

      if (booking.paymentStatus === "Paid") {
        booking.paymentStatus = "Refund Initiated";
        booking.refundAmount = booking.totalAmount;
        booking.refundStatus = "Completed";
        booking.refundDate = now;
      }

      await booking.save();

      console.log(`Auto-cancelled booking: ${booking._id}`);
    }

    // ==================================================
    // 2. AUTO-COMPLETE CONFIRMED BOOKINGS
    // ==================================================

    const expiredConfirmedBookings = await Booking.find({
      bookingStatus: "Confirmed",
      checkOutDate: {
        $lte: now,
      },
      bedsReleased: false,
    });

    for (const booking of expiredConfirmedBookings) {
      await releaseBeds(booking);

      booking.bookingStatus = "Completed";
      booking.actualCheckOut = now;

      await booking.save();

      console.log(`Auto-completed booking: ${booking._id}`);
    }

    // ==================================================
    // 3. AUTO CHECK-OUT CHECKED-IN BOOKINGS
    // ==================================================

    const expiredCheckedInBookings = await Booking.find({
      bookingStatus: "Checked-In",
      checkOutDate: {
        $lte: now,
      },
      bedsReleased: false,
    });

    for (const booking of expiredCheckedInBookings) {
      await releaseBeds(booking);

      booking.bookingStatus = "Checked-Out";
      booking.actualCheckOut = now;

      await booking.save();

      console.log(`Auto-checked-out booking: ${booking._id}`);
    }
  } catch (error) {
    console.error("Booking cleanup error:", error.message);
  }
};

// Run every 5 minutes
cron.schedule("*/5 * * * *", cleanupBookings);

export default cleanupBookings;
