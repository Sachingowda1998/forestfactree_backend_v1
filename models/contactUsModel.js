const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

const contactUsSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid email address"] 
  },
  mobileNumber: { 
    type: String, 
    required: [true, "Mobile number is required"], 
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  userType: { 
    type: String, 
    required: [true, "User type is required"]
  },
  enquiryDescription: { 
    type: String, 
    required: [true, "Enquiry description is required"] 
  },
  dateOfContact: { 
    type: Date, 
    default: Date.now 
  },
  enquiryStatus: {                 // Added this field
    type: String,
    default: "Pending"
  }
});

// Add mongoose-sanitize plugin
contactUsSchema.plugin(sanitize);

module.exports = mongoose.model("ContactUs", contactUsSchema);
