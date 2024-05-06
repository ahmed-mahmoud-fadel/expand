const express = require('express');
const router = express.Router();
const authorize = require('../utils/authorize');
const ContactUs = require('../models/ContactUs');

// Publci APIs

// Submit a New Contact Message
router.post('/', async (req, res) => {
    try {
        let newMessage = new ContactUs({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
        newMessage = await newMessage.save();
        res.status(200).json({ message: "Your message has been successfully sent." });
    } catch (err) {
        console.error("Error while submitting contact message:", err);
        res.status(500).json({ message: "An error occurred while submitting your message." });
    }
});


// Admin APIs

//Get All Contact Messages
router.get('/messages', authorize('admin'), async (req, res) => {
    try {
        const count = await ContactUs.countDocuments();
        const { page = 1, limit = 6 } = req.query;
        const messages = await ContactUs.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        res.status(200).json({
            messages,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10),
        });
    } catch (err) {
        console.error("Error while retrieving contact messages:", err);
        res.status(500).json({ message: "An error occurred while retrieving messages." });
    }
});

// Delete a Contact Message
router.delete('/:id', authorize('admin'), async (req, res) => {
    try {
        const deletedMessage = await ContactUs.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found." });
        }
        res.json({ message: "Message deleted successfully." });
    } catch (err) {
        console.error("Error while deleting contact message:", err);
        res.status(500).json({ message: "An error occurred while deleting the message." });
    }
});


// Get a specific Message
router.get('/:id', authorize('admin'), async(req,res)=>{
    const contactUs = await ContactUs.findById(req.params.id);

    if(!contactUs) {
        res.status(500).json({message: 'The contactus with the given ID was not found.'})
    } 
    res.status(200).json(contactUs);
})
module.exports =router;