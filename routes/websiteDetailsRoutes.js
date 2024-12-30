const express = require("express");
const router = express.Router();
const {
  addWebsiteDetails,
  editWebsiteDetails,
  deleteWebsiteDetails,
  viewWebsiteDetails,
} = require("../controllers/websiteDetailsController");

// Add website details
router.post("/add", addWebsiteDetails);

// Edit website details
router.put("/edit/:id", editWebsiteDetails);

// Delete website details
router.delete("/delete/:id", deleteWebsiteDetails);

// View website details
router.get("/all", viewWebsiteDetails);

module.exports = router;
