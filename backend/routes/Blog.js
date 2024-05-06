const express = require('express');
const router = express.Router();
const BlogPost = require('../models/Blog');
const authorize = require('../utils/authorize');
const upload = require('../utils/multer');
const s3 = require('../utils/aws-s3');
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

// Get active specific blog post by ID
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

// Get a Specific Blog Post by ID (Admin)
router.get('/:id', authorize('admin'), async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
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

router.post('/:id/blog-image', authorize('admin'), upload.single('file'), async (req, res) => {
    const file = req.file;
    const blogId = req.params.id;

    if (!file) {
        return res.status(400).send('Please upload a file.');
    }

    const allowedTypes = /jpeg|jpg|png/;
    const extension = allowedTypes.test(file.originalname.toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (!(extension && mimeType)) {
        return res.status(400).send('Invalid file type. Only JPEG, JPG and PNG files are allowed.');
    }

    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `blog-images/${blogId}-${Date.now()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read' 
    };

    try {
        const data = await s3.upload(s3Params).promise();
        await BlogPost.findByIdAndUpdate(blogId, { thumbnail: data.Location });
        res.status(200).json({ message: 'Profile image uploaded successfully!', thumbnail: data.Location });
    } catch (err) {
        console.error('Error uploading image to S3:', err);
        res.status(500).json({ message: 'Failed to upload profile image.' });
    }
});
module.exports = router;