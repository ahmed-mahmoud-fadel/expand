const { UserContactAccess } = require('../models/UserContactAccess'); // Adjust the path as necessary
const express = require('express');
const router = express.Router();

// Create a new access record
router.post('/', async (req, res) => {
    let userContactAccess = new UserContactAccess({
        user: req.body.user,
        contact: req.body.contact
    });

    userContactAccess = await userContactAccess.save();

    if (!userContactAccess) {
        return res.status(400).send('The access record cannot be created!');
    } else {
        res.send(userContactAccess);
    }
});

// Get all access records
router.get('/', async (req, res) => {
    const accessList = await UserContactAccess.find().populate('user').populate('contact');

    if (!accessList) {
        res.status(500).json({ success: false });
    } else {
        res.status(200).send(accessList);
    }
});

// Find a specific access record by ID
router.get('/:id', async (req, res) => {
    const accessRecord = await UserContactAccess.findById(req.params.id).populate('user').populate('contact');

    if (!accessRecord) {
        res.status(500).json({ message: 'The access record with the given ID was not found.' });
    } else {
        res.status(200).send(accessRecord);
    }
});

// Delete an access record
router.delete('/:id', async (req, res) => {
    UserContactAccess.findByIdAndRemove(req.params.id).then(accessRecord => {
        if (accessRecord) {
            res.status(200).json({ success: true, message: 'The access record is deleted!' });
        } else {
            res.status(404).json({ success: false, message: "Access record not found!" });
        }
    }).catch(err => {
        res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
