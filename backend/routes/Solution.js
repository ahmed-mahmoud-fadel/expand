const express = require('express');
const router = express.Router();
const Solution = require('../models/Solution');
const authorize = require('../utils/authorize');


// For Public 

// Get all active solutions
router.get('/active', async (req, res) => {
    try {
        const solutionList = await Solution.find({active: true});
        res.status(200).json(solutionList);
    } catch (err) {
        console.error("Failed to retrieve solutions:", err);
        res.status(500).json({  message: "An error occurred while retrieving solutions." });
    }
});

// Get all  solutions admin
router.get('/admin', authorize('admin'), async (req, res) => {
    try {
        const solutionList = await Solution.find();
        res.status(200).json(solutionList);
    } catch (err) {
        console.error("Failed to retrieve solutions:", err);
        res.status(500).json({  message: "An error occurred while retrieving solutions." });
    }
});

// Find a specific active solution by its ID
router.get('/:id', async (req, res) => {
    try {
        const solution = await Solution.findById({_id: req.params.id, acitve: true})
            .select('name description thumbnail tags');
        if (!solution) {
            return res.status(404).json({ message: 'The solution with the given ID was not found.' });
        }
        res.status(200).json(solution);
    } catch (err) {
        console.error("Failed to retrieve solution:", err);
        res.status(500).json({ message: 'An error occurred while retrieving the solution.' });
    }
});



// For Admin



// Add a new solution to the database
router.post('/', authorize('admin'), async (req, res) => {
    try {
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
        res.status(200).json(solution);
    } catch (err) {
        console.error("Failed to creating solution:", err);
        res.status(500).json({ message: 'An error occurred while creating the solution.' });
    }
});

// Update a specific solution in the database
router.put('/:id', authorize('admin'), async (req, res) => {
    try {
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
        res.status(200).json(solution);
    } catch (err) {
        console.error("Failed to updating solution:", err);
        res.status(500).json({ message: 'An error occurred while updating the solution.' });
    }
});

// Delete a specific solution from the database
router.delete('/:id', authorize('admin'), async (req, res) => {
    try {
        const deleteSolution = await Solution.findByIdAndDelete(req.params.id);
        if (!deleteSolution) {
            return res.status(404).json({ message: "Solution not found!" });
        }
        return res.status(200).json({ message: 'The solution is deleted!' });
    } catch (err) {
        console.error("Failed to deleting solution:", err);
        res.status(500).json({ message: 'An error occurred while deleting the solution.' });
    }
});

module.exports = router;

// Solution Activation

// Search and Filtering

// Tag Management