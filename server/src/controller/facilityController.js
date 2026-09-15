import Facility from "../models/Facility.js";

// Create Facility Configuration
export const createFacility = async (req, res) => {
  try {
    // Only one facility configuration should exist
    const existingFacility = await Facility.findOne();

    if (existingFacility) {
      return res.status(400).json({
        success: false,
        message:
          "Facility configuration already exists. Please update it instead.",
      });
    }

    const facility = await Facility.create(req.body);

    res.status(201).json({
      success: true,
      message: "Facility configuration created successfully.",
      facility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Facility Configuration
export const getAllFacilities = async (req, res) => {
  try {
    const facility = await Facility.findOne();

    res.status(200).json({
      success: true,
      totalFacilities: facility ? 1 : 0,
      facilities: facility ? [facility] : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Facility Configuration
export const getFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility configuration not found.",
      });
    }

    res.status(200).json({
      success: true,
      facility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Facility Configuration
export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      {
        wifi: Boolean(req.body.wifi),
        parking: Boolean(req.body.parking),
        laundry: Boolean(req.body.laundry),
        food: Boolean(req.body.food),
        juiceCorner: Boolean(req.body.juiceCorner),
        bikeParking: Boolean(req.body.bikeParking),
        scootyParking: Boolean(req.body.scootyParking),
        powerBackup: Boolean(req.body.powerBackup),
        hotWater: Boolean(req.body.hotWater),
        cctv: Boolean(req.body.cctv),
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility configuration not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Facility configuration updated successfully.",
      facility,
    });
  } catch (error) {
    console.error("Update facility error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Facility Configuration
export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findOneAndDelete({});

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility configuration not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Facility configuration deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
