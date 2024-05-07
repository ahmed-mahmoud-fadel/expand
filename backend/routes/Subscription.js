const express = require('express');
const router = express.Router();

const Subscription  = require('../models/Subscription');
const authorize = require('../utils/authorize');
const enforceAccessControl = require('../utils/enforceAccessControl');


// User APIs

// Get All Subscriptions for the Logged-in User
router.get('/user/:id',authorize('user'), enforceAccessControl(), async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ user: req.params.id })
        .populate({ path: 'solution', select: 'name description' })
        .populate({ path: 'pricingPlans', select: 'title' })
        res.json(subscriptions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while retrieving subscriptions." });
    }
});

// Create a Subscription for the Logged-in User
router.post('/:id', authorize('admin','user'), enforceAccessControl(), async (req, res) => {
    try {
        const userId = req.params.id;
        const { solutionId, pricingPlanId } = req.body;

        const newSubscription = new Subscription({
            user: userId,
            solution: solutionId,
            pricingPlans: pricingPlanId,
        });
        const savedSubscription = await newSubscription.save();
        res.status(201).json(savedSubscription);
    } catch (err) {
        console.error("Failed to create subscription:", err);
        res.status(500).json({ message: "An error occurred while creating the subscription." });
    }
});

// Cancel a Subscription
router.put('/:id/cancel', authorize('admin', 'user'), enforceAccessControl(), async (req, res) => {
    try {
        const subscription = await Subscription.findOneAndUpdate(
            { _id: req.body.subscriptionId },
            { status: 'canceled' },
            { new: true }
        );
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found." });
        }
        res.json({ message: "Subscription canceled successfully.", subscription });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while canceling the subscription." });
    }
});

// Admin APIs

// Get All Subscriptions 
router.get('/admin',authorize('admin'), async (req, res) => {
    try {
        const count = await Subscription.countDocuments();
        const { page = 1, limit = 6 } = req.query;
        const subscriptions = await Subscription.find()
        .populate({ path: 'user', select: ' email companyName' })
        .populate({ path: 'solution', select: 'name' })
        .populate({ path: 'pricingPlans', select: 'title' })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        res.json({ 
            subscriptions,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10)
        });
    } catch (err) {
        console.error("Error while retrieving Subscriptions:", err);
        res.status(500).json({ message: "An error occurred while retrieving subscriptions." });
    }
});

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
