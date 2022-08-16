const express = require('express');

const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

const routeProducts = express.Router();

routeProducts.get('/', productController.getAll);

routeProducts.get('/:id', productController.getById);

routeProducts.post('/', validateProduct, productController.add);

routeProducts.put('/:id', validateProduct, productController.update);

routeProducts.delete('/:id', productController.exclude);

module.exports = routeProducts;
