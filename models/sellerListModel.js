const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

// Define the seller list schema
const sellerListSchema = new mongoose.Schema({
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
    type: String,
    required: [true, "Mobile number is required"],
    unique: [true, "Mobile number already exists"],
    match: [/^\d{10}$/, "Mobile number should be 10 digits"],
  },
  alternateMobileNumber: {
    type: String,
    match: [/^\d{10}$/, "Alternate mobile number should be 10 digits"],
  },
  farmAddress: {
    type: String,
    required: [true, "Farm address is required"],
  },
  gstNumber: {
    type: String,
    match: [/^\d{15}$/, "Please enter a valid GST number"],
  },
  panNumber: {
    type: String,
  },
  additionalDetails: {
    type: String,
  },
  active: {
    type: String,
    enum: ["yes", "no"],
    default: "yes",
  },
});

// Add mongoose-sanitize plugin
sellerListSchema.plugin(sanitize);

module.exports = mongoose.model("SellerList", sellerListSchema);
