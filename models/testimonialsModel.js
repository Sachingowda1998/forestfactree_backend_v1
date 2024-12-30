const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

const testimonialSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"]
  },
  profileImage: { 
    type: String, 
    required: [true, "Profile image is required"]
  },
  description: { 
    type: String, 
    required: [true, "Description is required"], 
    maxlength: [180, "Description cannot exceed 180 characters"]
  }
});

// Add mongoose-sanitize plugin
testimonialSchema.plugin(sanitize);

// Limit the number of testimonials to 3
testimonialSchema.pre('save', async function (next) {
  const count = await mongoose.model("Testimonial").countDocuments();
  if (count >= 3) {
    return next(new Error("Cannot add more than 3 testimonials"));
  }
  next();
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
