import Room from "../models/Room.js";
// import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Create Room
// export const createRoom = async (req, res) => {
//   try {
//     const room = await Room.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Room created successfully.",
//       room,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
import Booking from "../models/Booking.js";
export const createRoom = async (req, res) => {
  try {
    console.log(req.body);

    if (typeof req.body.facilities === "string") {
      req.body.facilities = JSON.parse(req.body.facilities);
    }

    const room = await Room.create({
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Room created successfully.",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("rules");

    res.status(200).json({
      success: true,
      totalRooms: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Room
export const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("rules");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Room
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room updated successfully.",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Room
//

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    // Check if room is used in bookings
    const bookingExists = await Booking.findOne({
      room: room._id,
      bookingStatus: {
        $ne: "Cancelled",
      },
    });

    if (bookingExists) {
      return res.status(400).json({
        success: false,
        message: "This room has active bookings. You cannot delete it.",
      });
    }

    // Delete Cloudinary Images
    if (room.roomImages?.length) {
      for (const image of room.roomImages) {
        const publicId = image.split("/").slice(-2).join("/").split(".")[0];

        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log(err.message);
        }
      }
    }

    await room.deleteOne();

    res.status(200).json({
      success: true,
      message: "Room deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const filterRooms = async (req, res) => {
  try {
    const { roomType, sharingType, status, minPrice, maxPrice, roomNumber } =
      req.query;

    let filter = {};

    // Room Type
    if (roomType) {
      filter.roomType = roomType;
    }

    // Sharing Type
    if (sharingType) {
      filter.sharingType = sharingType;
    }

    // Status
    if (status) {
      filter.status = status;
    }

    // Room Number Search
    if (roomNumber) {
      filter.roomNumber = {
        $regex: roomNumber,
        $options: "i",
      };
    }

    // Price Filter
    if (minPrice || maxPrice) {
      filter.pricePerMonth = {};

      if (minPrice) {
        filter.pricePerMonth.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.pricePerMonth.$lte = Number(maxPrice);
      }
    }

    const rooms = await Room.find(filter)
      // .populate("facilities")
      .populate("rules");

    res.status(200).json({
      success: true,
      totalRooms: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
