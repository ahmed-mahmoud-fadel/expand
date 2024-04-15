const express = require('express');
const router = express.Router();
const PricingPlan = require('../models/PricingPlan');
const authorize = require('../utils/authorize');

// Public APIs

//Get All Pricing Plans
router.get('/', async (req, res) => {
    try {
        const plans = await PricingPlan.find({});

        // Check if the pricing plans was found
        if (!plans) {
            return res.status(404).json({ message: 'Pricing plans not found.' });
        }

        res.status(200).json(plans);
    } catch (err) {
        console.error("Failed to retrieve pricing plans:", err);
        res.status(500).json({ message: "An error occurred while retrieving pricing plans." });
    }
});

// Get a specific pricing plan by ID
router.get('/:id', async (req, res) => {
    try {
        const plan = await PricingPlan.findById(req.params.id);

        // Check if the pricing plan was found
        if (!plan) {
            return res.status(404).json({ message: 'Pricing plan not found.' });
        }

        res.status(200).json(plan);
    } catch (err) {
        console.error("Failed to retrieve pricing plan:", err);
        res.status(500).json({ message: 'An error occurred while retrieving the pricing plan.' });
    }
});


// Admin APIs

// Create a new pricing plan
router.post('/', authorize('admin'), async (req, res) => {
    try {
        const newPlan = new PricingPlan(req.body);
        const savedPlan = await newPlan.save();
        res.status(201).json(savedPlan);
    } catch (err) {
        console.error("Failed to create pricing plan:", err);
        res.status(500).json({ message: "An error occurred while creating the pricing plan." });
    }
});

// Update an existing pricing plan by ID
router.put('/:id', authorize('admin'), async (req, res) => {
    try {
        const updatedPlan = await PricingPlan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPlan) {
            return res.status(404).json({ message: "Pricing plan not found." });
        }
        res.status(200).json(updatedPlan);
    } catch (err) {
        console.error("Failed to update pricing plan:", err);
        res.status(500).json({ message: "An error occurred while updating the pricing plan." });
    }
});

// Delete a pricing plan by ID
router.delete('/:id', authorize('admin'), async (req, res) => {
    try {
        const deletedPlan = await PricingPlan.findByIdAndDelete(req.params.id);
        if (!deletedPlan) {
            return res.status(404).json({ message: "Pricing plan not found." });
        }
        res.status(200).json({ message: "Pricing plan deleted successfully." });
    } catch (err) {
        console.error("Failed to delete pricing plan:", err);
        res.status(500).json({ message: "An error occurred while deleting the pricing plan." });
    }
});
