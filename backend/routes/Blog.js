const express = require('express');
const router = express.Router();
const BlogPost = require('../models/Blog');
const authorize = require('../utils/authorize');

// List All Blog Posts with Pagination
router.get('/all',  authorize('admin'), async (req, res) => {
    const count = await BlogPost.countDocuments();
    const { page = 1, limit = 6 } = req.query; // Pagination with default values
    try {
        const posts = await BlogPost.find()
            .select('active title description date thumbnail link') // Example projection
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        res.status(200).json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the posts.' });
    }
});

// List All Active Blog Posts with Pagination
router.get('/active', async (req, res) => {
    const count = await BlogPost.countDocuments({ active: true });
    const { page = 1, limit = 6 } = req.query; // Pagination with default values
    try {
        const posts = await BlogPost.find({ active: true })
            .select('date title description thumbnail link') // Example projection
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        res.status(200).json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the posts.' });
    }
});

// 222Get active specific blog post by ID
router.get('/active/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById({_id: req.params.id, acitve: true})
            .select('title description thumbnail date link content');
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the blog post.' });
    }
});

// 22Get a specific blog post by ID for admin
router.get('/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id)
            .select('title description thumbnail date link content');
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the blog post.' });
    }
});

// Create a new blog post
router.post('/', authorize('admin'), async (req, res) => {
    try {
        const newPost = new BlogPost({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            thumbnail: req.body.thumbnail,
            link: req.body.link,
            active: req.body.active
        });
        await newPost.save();
        console.log("new post created successfuly")
        res.send({message: "Success"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the blog post.' });
    }
});

// Update a blog post
router.put('/:id', authorize('admin'), async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Blog post not found.' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the blog post.' });
    }
});

// Delete a blog post
router.delete('/:id', authorize('admin'),async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Blog post not found.' });
        }
        res.status(200).json({ message: 'Blog post successfully deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the blog post.' });
    }
});

module.exports = router;
