const express = require('express');
const router = express.Router();

const Subscription  = require('../models/Subscription');
const authorize = require('../utils/authorize');
const enforceAccessControl = require('../utils/enforceAccessControl');


// User APIs

// Get All Subscriptions for the Logged-in User
router.get('/',authorize('user'), enforceAccessControl(), async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user._id });
        res.json(subscriptions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while retrieving subscriptions." });
    }
});

// Create a Subscription for the Logged-in User
router.post('/', async (req, res) => {
    try {
        // Extract user and subscription details from the request
        const userId = req.auth.id; // Assuming `req.user._id` contains the ID of the authenticated user
        const { solutionId, pricingPlanId, autoRenew } = req.body;

        // Optional: Additional validation can be performed here (e.g., check if the solution and pricing plan exist)

        // Create the subscription
        const newSubscription = new Subscription({
            user: userId,
            solution: solutionId,
            pricingPlan: pricingPlanId,
            autoRenew: autoRenew,
        });

        // Save the subscription to the database
        const savedSubscription = await newSubscription.save();

        // Respond with the newly created subscription
        res.status(201).json(savedSubscription);
    } catch (err) {
        console.error("Failed to create subscription:", err);
        res.status(500).json({ message: "An error occurred while creating the subscription." });
    }
});

// Cancel a Subscription
router.patch('/:id/cancel', authorize('user'), enforceAccessControl(), async (req, res) => {
    try {
        const subscription = await Subscription.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { status: 'canceled' },
            { new: true }
        );
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found or not owned by user." });
        }
        res.json({ message: "Subscription canceled successfully.", subscription });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while canceling the subscription." });
    }
});

// Admin APIs

// Update a Subscription
router.put('/:id', authorize('admin'), async (req, res) => {
    try {
        const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSubscription) {
            return res.status(404).json({ message: "Subscription not found." });
        }
        res.json(updatedSubscription);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while updating the subscription." });
    }
});

// Delete a Subscription
router.delete('/:id', authorize('admin'), async (req, res) => {
    try {
        const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!deletedSubscription) {
            return res.status(404).json({ message: "Subscription not found." });
        }
        res.json({ message: "Subscription deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while deleting the subscription." });
    }
});



module.exports = router;
