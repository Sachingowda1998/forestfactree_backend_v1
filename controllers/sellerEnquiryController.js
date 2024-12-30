const SellerEnquiry = require("../models/sellerEnquiryModel");

// Add a new seller enquiry
exports.addEnquiry = async (req, res) => {
  const {
    name,
    email,
    mobile,
    alternateMobile,
    farmAddress,
    productName,
    weight,
    sellingPrice,
    enquiryDetails
  } = req.body;

  try {
    const newEnquiry = new SellerEnquiry({
      name,
      email,
      mobile,
      alternateMobile,
      farmAddress,
      productName,
      weight,
      sellingPrice,
      enquiryDetails,
      enquiryDate: new Date(),    // Added this field
      enquiryStatus: "Pending"    // Added this field
    });

    const savedEnquiry = await newEnquiry.save();
    res.status(201).json({
      message: "Enquiry submitted successfully. We will contact you shortly",
      savedEnquiry
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ messages });
    }
    res.status(500).json({ message: "Error adding enquiry", error });
  }
};

// Get all seller enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await SellerEnquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries", error });
  }
};

// Delete a seller enquiry by ID
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await SellerEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enquiry", error });
  }
};

// Update a seller enquiry by ID
exports.updateEnquiry = async (req, res) => {
  const {
    name,
    email,
    mobile,
    alternateMobile,
    farmAddress,
    productName,
    weight,
    sellingPrice,
    enquiryDetails,
    enquiryDate,
    enquiryStatus
  } = req.body;

  try {
    const updatedEnquiry = await SellerEnquiry.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobile,
        alternateMobile,
        farmAddress,
        productName,
        weight,
        sellingPrice,
        enquiryDetails,
        enquiryDate,
        enquiryStatus
      },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.status(200).json({ message: "Enquiry updated successfully", updatedEnquiry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ messages });
    }
    res.status(500).json({ message: "Error updating enquiry", error });
  }
};
