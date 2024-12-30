const express = require("express");
const router = express.Router();
const {
  addContactUs,
  getAllContacts,
  deleteContact,
  updateContact // Import the updateContact function
} = require("../controllers/contactUsController");

// Route to add a new Contact Us entry
router.post("/add", addContactUs);

// Route to get all Contact Us entries
router.get("/all", getAllContacts);

// Route to delete a Contact Us entry by ID
router.delete("/delete/:id", deleteContact);

// Route to update a Contact Us entry by ID
router.put("/update/:id", updateContact);  // Add this line

module.exports = router;
