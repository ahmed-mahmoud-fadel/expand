const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authorize = require('../utils/authorize');

// Public APIs

// Get all active products
router.get('/active', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const { page = 1, limit = 6 } = req.query;
        const products = await Product.find({ status: 'active' })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        res.json({ 
            products,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10)
        });
    } catch (error) {
        console.error("Error while retrieving active products:", error);
        res.status(500).json({ message: "An error occurred while retrieving products." });
    }
});

// Get all products (Admin)
router.get('/admin', authorize('admin'), async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const { page = 1, limit = 6 } = req.query;
        const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        res.json({ 
            products,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10)
        });
    } catch (error) {
        console.error("Error while retrieving active products:", error);
        res.status(500).json({ message: "An error occurred while retrieving products." });
    }
});

// Get a specific active product by ID 
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, status: 'active' });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error while retrieving the product:", error);
        res.status(500).json({ message: "An error occurred while fetching the product." });
    }
});

// Admin APIs



// Create a new product (Admin only)
router.post('/', authorize('admin'), async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Failed to create product:", error);
        res.status(500).json({ message: "An error occurred while creating the product." });
    }
});

// Update an existing product by ID (Admin only)
router.put('/:id', authorize('admin'), async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Failed to update product:", error);
        res.status(500).json({ message: "An error occurred while updating the product." });
    }
});

// Delete a product by ID (Admin only)
router.delete('/:id', authorize('admin'), async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Failed to delete product:", error);
        res.status(500).json({ message: "An error occurred while deleting the product." });
    }
});

module.exports = router;