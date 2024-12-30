const express = require("express");
const router = express.Router();
const {
  addEnquiry,
  getAllEnquiries,
  deleteEnquiry,
  updateEnquiry // Import the updateEnquiry function
} = require("../controllers/sellerEnquiryController");

// Route to add a new seller enquiry
router.post("/add", addEnquiry);

// Route to get all seller enquiries
router.get("/all", getAllEnquiries);

// Route to delete a seller enquiry by ID
router.delete("/delete/:id", deleteEnquiry);

// Route to update a seller enquiry by ID
router.put("/update/:id", updateEnquiry);  // Add this line

module.exports = router;
