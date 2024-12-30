const BuyerEnquiry = require("../models/BuyerEnquiryModel");

// Add a new buyer enquiry
exports.addEnquiry = async (req, res) => {
  const {
    enquiryDate,
    buyerName,
    buyerEmail,
    buyerPhoneNumber,
    buyerAlternatePhoneNumber,
    buyerAddress,
    enquiryDetails,
    enquiryStatus,
    buyerType
  } = req.body;

  try {
    const newEnquiry = new BuyerEnquiry({
      enquiryDate,
      buyerName,
      buyerEmail,
      buyerPhoneNumber,
      buyerAlternatePhoneNumber,
      buyerAddress,
      enquiryDetails,
      enquiryStatus,
      buyerType
    });

    const savedEnquiry = await newEnquiry.save();
    res.status(201).json({ message: "Request submitted successfully. We will contact you shortly", savedEnquiry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ messages });
    }
    res.status(500).json({ message: "Error adding enquiry", error });
  }
};

// Get all buyer enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await BuyerEnquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries", error });
  }
};

// Delete an enquiry by id
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await BuyerEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enquiry", error });
  }
};

// Update an enquiry by id
exports.updateEnquiry = async (req, res) => {
  const {
    enquiryDate,
    buyerName,
    buyerEmail,
    buyerPhoneNumber,
    buyerAlternatePhoneNumber,
    buyerAddress,
    enquiryDetails,
    enquiryStatus,
    buyerType
  } = req.body;

  try {
    const enquiry = await BuyerEnquiry.findByIdAndUpdate(
      req.params.id,
      {
        enquiryDate,
        buyerName,
        buyerEmail,
        buyerPhoneNumber,
        buyerAlternatePhoneNumber,
        buyerAddress,
        enquiryDetails,
        enquiryStatus,
        buyerType
      },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.status(200).json({ message: "Enquiry updated successfully", enquiry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ messages });
    }
    res.status(500).json({ message: "Error updating enquiry", error });
  }
};
