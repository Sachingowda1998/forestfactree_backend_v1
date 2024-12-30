const WebsiteDetails = require("../models/websiteDetailsModel");
const upload = require("../middleware/multerConfig");

// Add website details
exports.addWebsiteDetails = (req, res) => {
  upload.fields([{ name: 'aboutUsImage', maxCount: 1 }, { name: 'contactUsImage', maxCount: 1 }])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { email, mobileNumber, alternateMobileNumber, mailingAddress, aboutUsHeading, aboutUsDescriptionPart1, aboutUsDescriptionPart2, aboutUsDescriptionPart3, aboutUsDescriptionPart4 } = req.body;
    const aboutUsImage = req.files['aboutUsImage'][0].path.replace(/\\/g, "/");
    const contactUsImage = req.files['contactUsImage'][0].path.replace(/\\/g, "/");

    try {
      const newWebsiteDetails = new WebsiteDetails({
        email,
        mobileNumber,
        alternateMobileNumber,
        mailingAddress,
        aboutUsImage,
        contactUsImage,
        aboutUsHeading,
        aboutUsDescriptionPart1,
        aboutUsDescriptionPart2,
        aboutUsDescriptionPart3,
        aboutUsDescriptionPart4
      });

      const savedWebsiteDetails = await newWebsiteDetails.save();
      res.status(201).json({ message: "Website details added successfully", details: savedWebsiteDetails });
    } catch (error) {
      if (error.message.includes("Only one entry for website details is allowed")) {
        return res.status(400).json({ message: error.message });
      }
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }
      res.status(500).json({ message: "Failed to add website details", error: error.message });
    }
  });
};

// Edit website details
exports.editWebsiteDetails = (req, res) => {
  upload.fields([{ name: 'aboutUsImage', maxCount: 1 }, { name: 'contactUsImage', maxCount: 1 }])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { id } = req.params;
    const { email, mobileNumber, alternateMobileNumber, mailingAddress, aboutUsHeading, aboutUsDescriptionPart1, aboutUsDescriptionPart2, aboutUsDescriptionPart3, aboutUsDescriptionPart4 } = req.body;
    const aboutUsImage = req.files['aboutUsImage'] ? req.files['aboutUsImage'][0].path.replace(/\\/g, "/") : undefined;
    const contactUsImage = req.files['contactUsImage'] ? req.files['contactUsImage'][0].path.replace(/\\/g, "/") : undefined;

    const updatedWebsiteDetailsData = {
      email,
      mobileNumber,
      alternateMobileNumber,
      mailingAddress,
      aboutUsHeading,
      aboutUsDescriptionPart1,
      aboutUsDescriptionPart2,
      aboutUsDescriptionPart3,
      aboutUsDescriptionPart4
    };

    if (aboutUsImage) {
      updatedWebsiteDetailsData.aboutUsImage = aboutUsImage;
    }
    if (contactUsImage) {
      updatedWebsiteDetailsData.contactUsImage = contactUsImage;
    }

    try {
      const updatedWebsiteDetails = await WebsiteDetails.findByIdAndUpdate(id, updatedWebsiteDetailsData, {
        new: true,
        runValidators: true,
      });

      if (!updatedWebsiteDetails) {
        return res.status(404).json({ message: "Website details not found" });
      }

      res.status(200).json({ message: "Website details updated successfully", details: updatedWebsiteDetails });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }
      res.status(500).json({ message: "Failed to update website details", error: error.message });
    }
  });
};

// Delete website details
exports.deleteWebsiteDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWebsiteDetails = await WebsiteDetails.findByIdAndDelete(id);

    if (!deletedWebsiteDetails) {
      return res.status(404).json({ message: "Website details not found" });
    }

    res.status(200).json({ message: "Website details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete website details", error: error.message });
  }
};

// View website details
exports.viewWebsiteDetails = async (req, res) => {
  try {
    const websiteDetails = await WebsiteDetails.find();
    res.status(200).json({ websiteDetails });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve website details", error: error.message });
  }
};
