const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

const unitSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: [true, "Unit is required"],
    trim: true,
    unique: [true, "Unit already exists"]
  },
  active: {
    type: String,
    enum: ["yes", "no"],
    default: "yes",
  },
});

// Add mongoose-sanitize plugin
unitSchema.plugin(sanitize);

module.exports = mongoose.model("Unit", unitSchema);

