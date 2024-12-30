

const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

const websiteDetailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Mobile number should be 10 digits"]
  },
  alternateMobileNumber: {
    type: String,
    match: [/^\d{10}$/, "Alternate mobile number should be 10 digits"]
  },
  mailingAddress: {
    type: String,
    required: [true, "Mailing address is required"]
  },
  aboutUsImage: {
    type: String,
    required: [true, "About Us image is required"]
  },
  contactUsImage: {
    type: String,
    required: [true, "Contact Us image is required"]
  },
  aboutUsHeading: {
    type: String,
    required: [true, "About Us heading is required"]
  },
  aboutUsDescriptionPart1: {
    type: String,
    required: [true, "About Us description part 1 is required"]
  },
  aboutUsDescriptionPart2: {
    type: String,
    required: [true, "About Us description part 2 is required"]
  },
  aboutUsDescriptionPart3: {
    type: String,
    required: [true, "About Us description part 3 is required"]
  },
  aboutUsDescriptionPart4: {
    type: String,
    required: [true, "About Us description part 4 is required"]
  }
});

// Add mongoose-sanitize plugin
websiteDetailsSchema.plugin(sanitize);

// Ensure only one entry exists
websiteDetailsSchema.pre('save', async function (next) {
  const count = await mongoose.model("WebsiteDetails").countDocuments();
  if (count >= 1) {
    return next(new Error("Only one entry for website details is allowed"));
  }
  next();
});

module.exports = mongoose.model("WebsiteDetails", websiteDetailsSchema);
