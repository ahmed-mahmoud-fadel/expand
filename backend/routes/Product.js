const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authorize = require('../utils/authorize');

const upload = require('../utils/multer');
const s3 = require('../utils/aws-s3');

// Public APIs

// Get all active products
router.get('/active', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const { page = 1, limit = 6, category = 'all' } = req.query;

        const query = { status: 'active', model: { $exists: true, $ne: null } };
        if (category !== 'all') {
            query.category = { $regex : new RegExp(category, "i") };
        }
        
        const products = await Product.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        res.json({ 
            products,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10)
        });
    } catch (error) {
        console.error("Error while retrieving active products:", error);
        res.status(500).json({ message: "An error occurred while retrieving products." });
    }
});

// Get all products (Admin)
router.get('/admin', authorize('admin'), async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const { page = 1, limit = 6 } = req.query;
        const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        res.json({ 
            products,
            totalPages: Math.ceil(count / limit),
            currentPage:  parseInt(page, 10)
        });
    } catch (error) {
        console.error("Error while retrieving active products:", error);
        res.status(500).json({ message: "An error occurred while retrieving products." });
    }
});

// Get a specific active product by ID 
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, status: 'active' });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error while retrieving the product:", error);
        res.status(500).json({ message: "An error occurred while fetching the product." });
    }
});

router.get('/admin/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error while retrieving the product:", error);
        res.status(500).json({ message: "An error occurred while fetching the product." });
    }
});
  

// Admin APIs

// Create a new product (Admin only)
router.post('/', authorize('admin'), async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Failed to create product:", error);
        res.status(500).json({ message: "An error occurred while creating the product." });
    }
});

// Update an existing product by ID (Admin only)
router.put('/:id', authorize('admin'), async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Failed to update product:", error);
        res.status(500).json({ message: "An error occurred while updating the product." });
    }
});

// Delete a product by ID (Admin only)
router.delete('/:id', authorize('admin'), async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Failed to delete product:", error);
        res.status(500).json({ message: "An error occurred while deleting the product." });
    }
});

// Upload thumbnail product
router.post('/:id/product-image', authorize('admin'), upload.single('file'), async (req, res) => {
    const file = req.file;
    const productID = req.params.id;

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
        Key: `products-images/${productID}-${Date.now()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read' 
    };

    try {
        const data = await s3.upload(s3Params).promise();
        await Product.findByIdAndUpdate(productID, { thumbnail: data.Location });
        res.status(200).json({ message: 'Profile image uploaded successfully!', thumbnail: data.Location });
    } catch (err) {
        console.error('Error uploading image to S3:', err);
        res.status(500).json({ message: 'Failed to upload profile image.' });
    }
});

// Upload 3d model of product
router.post('/:id/product-model', authorize('admin'), upload.single('file'), async (req, res) => {
    const file = req.file;
    const productID = req.params.id;

    if (!file) {
        return res.status(400).json({message: 'Please upload a file.'});
    }

    const allowedTypes = /\.glb$/i;
    // const allowedMimeType = /^model\/gltf-binary$/i;
    const extension = allowedTypes.test(file.originalname.toLowerCase());
    // const mimeType = allowedMimeType.test(file.mimetype);

    if (!(extension)) {
        return res.status(400).json({message: 'Invalid file type. Only GLB files are allowed.'});
    }

    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `products-models/${productID}-${Date.now()}.glb`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read' 
    };

    try {
        const data = await s3.upload(s3Params).promise();
        await Product.findByIdAndUpdate(productID, { model: data.Location });
        res.status(200).json({ message: '3D Model uploaded successfully!', model: data.Location });
    } catch (err) {
        console.error('Error uploading Model to S3:', err);
        res.status(500).json({ message: 'Failed to upload Model.' });
    }
});


module.exports = router;
