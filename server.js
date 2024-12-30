// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet"); // Import Helmet
const rateLimit = require('express-rate-limit');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes 
app.use(cors());

// Define the rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: "Too many requests from this IP, please try again after 15 minutes"
// });

// Apply the rate limiter to all requests
// app.use(limiter);
   
// Use Helmet for added security headers
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "data:", process.env.FRONT_END_URL, "http://localhost:3001"], // Allow images from self and front-end origin
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow resources to be shared across origins
}));
   
// Serve static files from the "uploads" directory 
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error: ", err));


const categoryRoutes = require("./routes/categoryRoutes");
const buyerEnquiryRoutes = require("./routes/buyerEnquiryRoutes");
const sellerEnquiryRoutes = require("./routes/sellerEnquiryRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const unitRoutes = require("./routes/unitRoutes");
const buyerListRoutes = require("./routes/buyerListRoutes"); // Import BuyerList routes
const sellerListRoutes = require("./routes/sellerListRoutes"); // Import SellerList routes
const productRoutes = require("./routes/productRoutes");
const purchaseHistoryRoutes = require("./routes/purchaseHistoryRoutes");
const salesHistoryRoutes = require("./routes/salesHistoryRoutes");
const testimonialsRoutes = require("./routes/testimonialsRoutes");
const websiteDetailsRoutes = require("./routes/websiteDetailsRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const adminRoutes = require("./routes/AdminRoutes");

// Use Routes
app.use("/forestfactree/categories", categoryRoutes);
app.use("/forestfactree/buyer-enquiries", buyerEnquiryRoutes);
app.use("/forestfactree/seller-enquiries", sellerEnquiryRoutes);
app.use("/forestfactree/contact-us", contactUsRoutes);
app.use("/forestfactree/units", unitRoutes);
app.use("/forestfactree/buyers", buyerListRoutes); // Use BuyerList routes
app.use("/forestfactree/sellers", sellerListRoutes); // Use SellerList routes
app.use("/forestfactree/products", productRoutes);
app.use("/forestfactree/purchase-history", purchaseHistoryRoutes);
app.use("/forestfactree/sales-history", salesHistoryRoutes);
app.use("/forestfactree/testimonials", testimonialsRoutes);
app.use("/forestfactree/website-details", websiteDetailsRoutes);
app.use("/forestfactree/subcategories", subcategoryRoutes);
app.use("/forestfactree/admin", adminRoutes);

// Define Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5000`);
});
