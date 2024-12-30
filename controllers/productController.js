const Product = require("../models/productModel");
const upload = require("../middleware/multerConfig");

// Add a new product
exports.addProduct = (req, res) => {
  upload.array('images', 4)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { productName, shortDescription, longDescription, weight, units, treeMeasure, category, subcategory } = req.body;
    const images = req.files.map(file => file.path);

    try {
      const newProduct = new Product({
        productName,
        shortDescription,
        longDescription,
        images: images.map(image => image.replace(/\\/g, "/")),  // Normalize image paths
        weight,
        units,
        treeMeasure,
        category,
        subcategory,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }
      res.status(500).json({ message: "Failed to add product", error: error.message });
    }
  });
};

exports.editProduct = (req, res) => {
  upload.array('images', 4)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { id } = req.params;
    const {
      productName,
      shortDescription,
      longDescription,
      weight,
      units,
      treeMeasure,
      category,
      subcategory,
    } = req.body;

    const newImages = req.files ? req.files.map((file) => file.path.replace(/\\/g, "/")) : [];

    try {
      // Find the existing product
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      // If no new images are provided, keep existing images
      const updatedImages = newImages.length > 0 ? newImages : existingProduct.images;

      // Prepare updated data
      const updatedProductData = {
        productName,
        shortDescription,
        longDescription,
        weight,
        units,
        treeMeasure,
        category,
        subcategory,
        images: updatedImages,
      };

      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }
      res.status(500).json({ message: "Failed to update product", error: error.message });
    }
  });
};


// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

// View all products
exports.viewProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products", error: error.message });
  }
};


// Fetch product details by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve product", error: error.message });
  }
};

// Fetch all product names, IDs and units
exports.getProductNames = async (req, res) => {
  try {
    const products = await Product.find({}, { _id: 1, productName: 1, units: 1, weight:1 }); // Select only _id, productName and units
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve product names", error: error.message });
  }
};

