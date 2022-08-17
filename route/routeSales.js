const express = require('express');
const salesController = require('../controllers/salesController');

 const salesValidation = require('../middlewares/ValidateSales');

const routeSales = express.Router();

routeSales.get('/', salesController.getAll);

routeSales.get('/:id', salesController.getById);

routeSales.post('/', salesValidation, salesController.addSalesProducts);

routeSales.put('/:id', salesValidation, salesController.updateSales);

routeSales.delete('/:id', salesController.deleteSales);

module.exports = routeSales;
