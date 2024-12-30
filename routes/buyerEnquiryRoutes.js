const express = require("express");
const router = express.Router();
const {
  addEnquiry,
  getAllEnquiries,
  deleteEnquiry, 
  updateEnquiry // Import the updateEnquiry function
} = require("../controllers/buyerEnquiryController");

// Route to add a new enquiry
router.post("/add", addEnquiry);

// Route to get all enquiries
router.get("/all", getAllEnquiries);

// Route to delete enquiry by id
router.delete("/delete/:id", deleteEnquiry);

// Route to update enquiry by id
router.put("/update/:id", updateEnquiry);  // Add this line

module.exports = router;
