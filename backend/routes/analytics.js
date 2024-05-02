const express = require('express');
const router = express.Router();

const Subscription  = require('../models/Subscription');
const BlogPost = require('../models/Blog');
const ContactUs = require('../models/ContactUs');
const PricingPlans = require('../models/PricingPlans');
const Solution = require('../models/Solution');
const User = require('../models/User');

const authorize = require('../utils/authorize');

router.get('/', async (req, res) => {
    try {
        
    } catch (err) {
        console.error("Failed to retrieve pricing plans:", err);
        res.status(500).json({ message: "An error occurred while retrieving pricing plans." });
    }
});


module.exports = router;
