const express = require("express");
const router = express.Router();
const {
  addTestimonial,
  editTestimonial,
  deleteTestimonial,
  viewTestimonials,
} = require("../controllers/testimonialsController");

// Add a new testimonial
router.post("/add", addTestimonial);

// Edit an existing testimonial
router.put("/edit/:id", editTestimonial);

// Delete a testimonial
router.delete("/delete/:id", deleteTestimonial);

// View all testimonials
router.get("/all", viewTestimonials);

module.exports = router;
