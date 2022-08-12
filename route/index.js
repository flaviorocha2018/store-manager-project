const express = require('express');

const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

const route = express.Router();

route.get('/', productController.getAll);

route.get('/:id', productController.getById);

route.post('/', validateProduct, productController.add);

route.put('/:id', productController.update);

route.delete('/:id', productController.exclude);

module.exports = route;
