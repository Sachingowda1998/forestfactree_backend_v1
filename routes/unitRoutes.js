const express = require("express");
const router = express.Router();
const { addUnit, deleteUnit, getAllUnits } = require("../controllers/unitController");

// Route to add a new unit
router.post("/", addUnit);

// Route to get all units
router.get("/", getAllUnits);

// Route to delete a unit by ID
router.delete("/:id", deleteUnit);

module.exports = router;
