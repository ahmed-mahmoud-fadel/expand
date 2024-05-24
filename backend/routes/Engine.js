const express = require('express');
const router = express.Router();
const path = require('path')
const Product = require('../models/Product');

router.get('/model/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    const response = await fetch(product.model);
    if (!response.ok) {
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }

    res.setHeader('Content-Type', 'model/gltf-binary');
    res.setHeader("Accept-Ranges", "bytes")
    res.setHeader("Content-Length", response.headers.get("Content-Length"))
    res.send(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    res.status(500).send('Error fetching model: ' + error.message);
  }
});

router.get('/', (req, res) => {
  res.sendFile(path.resolve('engine/index.html')) 
})

router.use(express.static("engine"))

module.exports = router