const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product'); // Ensure the correct path to your model
const router = express.Router();

// ✅ CREATE: Add a new product
router.post(
  '/add',
  [
      body('name').notEmpty().withMessage('Product name is required'),
      body('category').notEmpty().withMessage('Category is required'),
      body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive number'),
      body('unit').notEmpty().withMessage('Unit is required'),
      body('price').isFloat({ min: 0 }).withMessage('Price must be a valid number'),
      body('description').notEmpty().withMessage('Description is required'),
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      try {
          const { name, category, quantity, unit, price, description } = req.body;

          const product = new Product({ name, category, quantity, unit, price, description });
          await product.save();
          
          res.status(201).json({ message: '✅ Product added successfully', product });
      } catch (error) {
          res.status(500).json({ message: '❌ Error saving product', error });
      }
  }
);


// ✅ READ: Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// ✅ UPDATE: Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});

// ✅ DELETE: Remove a product by ID
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

module.exports = router;
