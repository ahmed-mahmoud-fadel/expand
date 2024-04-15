const Invoice = require('../models/Invoice'); // Adjust the path as necessary
const express = require('express');
const router = express.Router();

// Get all invoices in the database
router.get('/', async (req, res) => {
    const invoiceList = await Invoice.find()

    if (!invoiceList) {
        res.status(500).json({ success: false });
    } else {
        res.status(200).send(invoiceList);
    }
});

// Find a specific invoice by ID in the database
router.get('/:id', async (req, res) => {
    const invoice = await Invoice.findById(req.params.id).populate('subscription');

    if (!invoice) {
        res.status(500).json({ message: 'The invoice with the given ID was not found.' });
    } else {
        res.status(200).send(invoice);
    }
});

// Add a new invoice to the database
router.post('/', async (req, res) => {
    let invoice = new Invoice({
        subscription: req.body.subscription,
        totalAmount: req.body.totalAmount,
        currency: req.body.currency,
        dueDate: req.body.dueDate,
        paid: req.body.paid,
        paymentDate: req.body.paymentDate,
        created_at: req.body.created_at || Date.now() // Date.now() is default, but explicitly setting it as per your model's default
    });

    invoice = await invoice.save();

    if (!invoice) {
        res.status(400).send('The invoice cannot be created!');
    } else {
        res.send(invoice);
    }
});

// Update a specific invoice in the database
router.put('/:id', async (req, res) => {
    const invoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        {
            subscription: req.body.subscription,
            totalAmount: req.body.totalAmount,
            currency: req.body.currency,
            dueDate: req.body.dueDate,
            paid: req.body.paid,
            paymentDate: req.body.paymentDate
        },
        { new: true }
    );

    if (!invoice) {
        res.status(400).send('The invoice cannot be updated!');
    } else {
        res.send(invoice);
    }
});

// Delete a specific invoice from the database
router.delete('/:id', async (req, res) => {
    Invoice.findByIdAndDelete(req.params.id).then(invoice => {
        if (invoice) {
            res.status(200).json({ success: true, message: 'The invoice is deleted!' });
        } else {
            res.status(404).json({ success: false, message: "Invoice not found!" });
        }
    }).catch(err => {
        res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
