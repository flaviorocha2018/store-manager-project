const salesService = require('../services/salesService');
const productService = require('../services/productService');

const addSalesProducts = async (req, res, next) => {
  try {
    const products = req.body;
    const notFound = await products.reduce(async (acc, product) => {
      const productExiste = await productService.getById(product.productId);
       if (!productExiste) {
        return 'not-Found';
        //  return res.status(404).json({ message: 'Product not found' });
       }
       return acc;
    }, '');
    if (notFound) return res.status(404).json({ message: 'Product not found' });
    const productsSales = await salesService.addSalesProducts(products);
    return res.status(201).json(productsSales);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res) => {
  try {
    const products = await salesService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesService.getById(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const itemsUpdated = req.body;
  const response = await salesService.updateSales({ saleId: id, itemsUpdated });
 // response= { code: 404, message: 'Sale not found' }
  if (response.code) return res.status(response.code).json(response);
  return res.status(200).json(response);
};

const deleteSales = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSales(id);
    if (!result) return res.status(404).json({ message: 'Sale not found' });
    return res.status(204).json({ message: 'Sale deleted' });
  } catch (error) {
     console.error(error);
     return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addSalesProducts,
  getAll,
  getById,
  updateSales,
  deleteSales,
};
