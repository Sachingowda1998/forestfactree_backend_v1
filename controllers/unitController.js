const Unit = require("../models/unitModel");

// Add a new unit
exports.addUnit = async (req, res) => {
  try {
    const { unit, active } = req.body;

    if (!unit) {
      return res.status(400).json({ message: "Unit is required" });
    }

    const newUnit = new Unit({ unit, active });
    await newUnit.save();
    res.status(201).json({ message: "Unit added successfully", unit: newUnit });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Unit already exists. Please use a different unit." });
    }
    res.status(500).json({ message: "Failed to add unit", error: error.message });
  }
};

// Delete a unit
const mongoose = require("mongoose");

exports.deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid unit ID" });
    }

    const deletedUnit = await Unit.findByIdAndDelete(id);

    if (!deletedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete unit", error: error.message });
  }
};


// Get all units
exports.getAllUnits = async (req, res) => {
    try {
      const units = await Unit.find();
      res.status(200).json({ message: "Units fetched successfully", units });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch units", error: error.message });
    }
  };