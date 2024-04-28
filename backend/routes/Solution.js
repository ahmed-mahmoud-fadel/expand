const express = require('express');
const router = express.Router();
const Solution = require('../models/Solution');
const authorize = require('../utils/authorize');


// For Public 

// Get all active solutions
router.get('/', async (req, res) => {
    try {
        const solutionList = await Solution.find({active: true});

        // Successfully retrieved solution list
        res.status(200).json({ success: true, data: solutionList });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Failed to retrieve solutions:", err);

        // Respond with a generic server error message to the client
        res.status(500).json({ success: false, message: "An error occurred while retrieving solutions." });
    }
});

// Find a specific active solution by its ID
router.get('/:id', async (req, res) => {
    try {
        const solution = await Solution.findById({_id: req.params.id, acitve: true})
            .select('name description thumbnail tags');
        // Check if the solution exists
        if (!solution) {
            return res.status(404).json({ message: 'The solution with the given ID was not found.' });
        }

        res.status(200).json(solution);
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Failed to retrieve solution:", err);

        // Respond with a generic server error message to the client
        res.status(500).json({ message: 'An error occurred while retrieving the solution.' });
    }
});



// For Admin

// Add a new solution to the database
router.post('/', authorize('admin'), async (req, res) => {
    let solution = new Solution({
        name: req.body.name,
        description: req.body.description,
        modelUsed: req.body.modelUsed,
        algorithm: req.body.algorithm,
        category: req.body.category,
        tags: req.body.tags
    });
    solution = await solution.save();

    if (!solution)
        return res.status(400).send('The solution cannot be created!');

    res.send(solution);
});

// Update a specific solution in the database
router.put('/:id', authorize('admin'), async (req, res) => {
    const solution = await Solution.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            modelUsed: req.body.modelUsed,
            algorithm: req.body.algorithm,
            category: req.body.category,
            tags: req.body.tags
        },
        { new: true }
    );

    if (!solution)
        return res.status(400).send('The solution cannot be updated!');

    res.send(solution);
});

// Delete a specific solution from the database
router.delete('/:id', authorize('admin'), (req, res) => {
    Solution.findByIdAndDelete(req.params.id).then(solution => {
        if (solution) {
            return res.status(200).json({ success: true, message: 'The solution is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: "Solution not found!" });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;

// Solution Activation

// Search and Filtering

// Tag Management