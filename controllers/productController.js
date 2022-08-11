const express = require('express');

const productService = require('../services/productService');

const route = express.Router();

route.get('/', async (_req, res, _next) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = route;
