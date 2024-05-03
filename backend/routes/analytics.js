const express = require('express');
const router = express.Router();

const Subscription  = require('../models/Subscription');
const BlogPost = require('../models/Blog');
const ContactUs = require('../models/ContactUs');
const PricingPlans = require('../models/PricingPlans');
const Solution = require('../models/Solution');
const User = require('../models/User');

const authorize = require('../utils/authorize');

// the total number of users
router.get('/user-count', authorize('admin'), async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ count: userCount });
    } catch (error) {
        console.error("Error fetching user count:", error);
        res.status(500).json({ message: "Failed to retrieve user count." });
    }
});


// the count of active subscriptions
router.get('/active-subscriptions', authorize('admin'), async (req, res) => {
    try {
        const activeSubscriptionsCount = await Subscription.countDocuments({ status: 'active' });
        res.status(200).json({ count: activeSubscriptionsCount });
    } catch (error) {
        console.error("Error fetching active subscriptions count:", error);
        res.status(500).json({ message: "Failed to retrieve active subscriptions count." });
    }
});

// the total number of solutions
router.get('/solution-count', authorize('admin'), async (req, res) => {
    try {
        const solutionCount = await Solution.countDocuments();
        res.status(200).json({ count: solutionCount });
    } catch (error) {
        console.error("Error fetching user count:", error);
        res.status(500).json({ message: "Failed to retrieve user count." });
    }
});

module.exports = router;
