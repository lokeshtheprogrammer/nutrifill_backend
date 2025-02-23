const Product = require("../models/productModel");

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
