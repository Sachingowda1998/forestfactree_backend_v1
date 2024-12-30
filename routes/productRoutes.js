const express = require("express");
const router = express.Router();
const {
  addProduct,
  editProduct,
  deleteProduct,
  viewProducts,
  getProductById,
  getProductNames,
} = require("../controllers/productController");

// Add a new product
router.post("/add", addProduct);

// Fetch all product names and IDs
router.get("/names", getProductNames);

// Edit an existing product
router.put("/edit/:id", editProduct);

// Delete a product
router.delete("/delete/:id", deleteProduct);

// View all products
router.get("/all", viewProducts);

// View a product by ID 
router.get("/:id", getProductById); 



module.exports = router;
