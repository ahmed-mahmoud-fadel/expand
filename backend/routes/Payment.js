const { Payment } = require('../models/Payment'); // Adjust the path as necessary
const express = require('express');
const router = express.Router();

// Create a new payment
router.post('/', async (req, res) => {
    let payment = new Payment({
        invoice: req.body.invoice,
        methodOfPayment: req.body.methodOfPayment,
        amount: req.body.amount,
        currency: req.body.currency,
        date: req.body.date,
        status: req.body.status,
        errorDescription: req.body.errorDescription
    });

    payment = await payment.save();

    if (!payment) {
        return res.status(400).send('The payment cannot be created!');
    } else {
        res.send(payment);
    }
});

// Get all payments
router.get('/', async (req, res) => {
    const paymentList = await Payment.find().populate('invoice');

    if (!paymentList) {
        res.status(500).json({ success: false });
    } else {
        res.status(200).send(paymentList);
    }
});

// Find a specific payment by ID
router.get('/:id', async (req, res) => {
    const payment = await Payment.findById(req.params.id).populate('invoice');

    if (!payment) {
        res.status(500).json({ message: 'The payment with the given ID was not found.' });
    } else {
        res.status(200).send(payment);
    }
});

// Update a payment
router.put('/:id', async (req, res) => {
    const payment = await Payment.findByIdAndUpdate(
        req.params.id,
        {
            invoice: req.body.invoice,
            methodOfPayment: req.body.methodOfPayment,
            amount: req.body.amount,
            currency: req.body.currency,
            date: req.body.date,
            status: req.body.status,
            errorDescription: req.body.errorDescription
        },
        { new: true }
    );

    if (!payment) {
        return res.status(400).send('The payment cannot be updated!');
    } else {
        res.send(payment);
    }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
    Payment.findByIdAndRemove(req.params.id).then(payment => {
        if (payment) {
            res.status(200).json({ success: true, message: 'The payment is deleted!' });
        } else {
            res.status(404).json({ success: false, message: "Payment not found!" });
        }
    }).catch(err => {
        res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
