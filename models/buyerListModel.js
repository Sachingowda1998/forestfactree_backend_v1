const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

// Define the buyer list schema
const buyerListSchema = new mongoose.Schema({
  dateOfAdding: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Mobile number is required"],
    unique: [true, "Mobile number already exists"],
    match: [/^\d{10}$/, "Mobile number should be 10 digits"],
  },
  alternateMobileNumber: {
    type: Number,
    match: [/^\d{10}$/, "Alternate mobile number should be 10 digits"],
  },
  buyerType: {
    type: String,
  },
  millAddress: {
    type: String,
    required: [true, "Mill address is required"],
  },
  gstNumber: {
    type: String,
    match: [/^\d{15}$/, "Please enter a valid GST number"],
  },
  panNumber: {
    type: String,
  },
  additionalDetails: {               // Added this field
    type: String,
  },
});

// Add mongoose-sanitize plugin
buyerListSchema.plugin(sanitize);

module.exports = mongoose.model("BuyerList", buyerListSchema);
