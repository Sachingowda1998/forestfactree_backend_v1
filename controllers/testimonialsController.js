const Testimonial = require("../models/testimonialsModel");
const upload = require("../middleware/multerConfig");

// Add a new testimonial
exports.addTestimonial = (req, res) => {
  upload.single('profileImage')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { name, description } = req.body;
    const profileImage = req.file.path;

    try {
      const newTestimonial = new Testimonial({
        name,
        profileImage,
        description
      });

      const savedTestimonial = await newTestimonial.save();
      res.status(201).json({ message: "Testimonial added successfully", testimonial: savedTestimonial });
    } catch (error) {
      if (error.message.includes("Cannot add more than 3 testimonials")) {
        return res.status(400).json({ message: error.message });
      }
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }
      res.status(500).json({ message: "Failed to add testimonial", error: error.message });
    }
  });
};

// Edit an existing testimonial
exports.editTestimonial = (req, res) => {
  upload.single('profileImage')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { id } = req.params;
    const { name, description } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    const updatedTestimonialData = { name, description };
    if (profileImage) {
      updatedTestimonialData.profileImage = profileImage;
    }

    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedTestimonialData, {
        new: true,
        runValidators: true,
      });

      if (!updatedTestimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }

      res.status(200).json({ message: "Testimonial updated successfully", testimonial: updatedTestimonial });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }
      res.status(500).json({ message: "Failed to update testimonial", error: error.message });
    }
  });
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete testimonial", error: error.message });
  }
};

// View all testimonials
exports.viewTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ testimonials });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve testimonials", error: error.message });
  }
};
