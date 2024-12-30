const ContactUs = require("../models/contactUsModel");

// Add a new Contact Us entry
exports.addContactUs = async (req, res) => {
  const {
    name,
    email,
    mobileNumber,
    userType,
    enquiryDescription
  } = req.body;

  try {
    const newContact = new ContactUs({
      name,
      email,
      mobileNumber,
      userType,
      enquiryDescription,
      enquiryStatus: "Pending"    // Set default enquiryStatus
    });

    const savedContact = await newContact.save();
    res.status(201).json({
      message: "Contact details submitted successfully. We will contact you shortly",
      savedContact
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists. Please use a different email address." });
    }
    res.status(500).json({ message: "Error adding contact details", error });
  }
};

// Get all Contact Us entries
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact details", error });
  }
};

// Delete a Contact Us entry by ID
exports.deleteContact = async (req, res) => {
  try {
    const contact = await ContactUs.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

// Update a Contact Us entry by ID
exports.updateContact = async (req, res) => {
  const {
    name,
    email,
    mobileNumber,
    userType,
    enquiryDescription,
    enquiryStatus
  } = req.body;

  try {
    const updatedContact = await ContactUs.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobileNumber,
        userType,
        enquiryDescription,
        enquiryStatus
      },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    res.status(500).json({ message: "Error updating contact", error });
  }
};
