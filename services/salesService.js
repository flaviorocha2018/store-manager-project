const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModels');

const addSalesProducts = async (productsSales) => {
  let saleIsValid = true;
  const getAll = await productsModel.getAll();
  productsSales.forEach((item) => {
    const result = getAll.find((product) => product.id === item.productId);
    if (!result) {
      saleIsValid = false;
    } 
});
  if (saleIsValid) {
    const { id } = await salesModel.addSales();
    await Promise.all(
      productsSales.map((products) =>
        salesModel.addSalesProducts(id, products.productId, products.quantity)),
    );
    return { id, itemsSold: productsSales };
  }
  return null;
};

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const product = await salesModel.getById(id);
  if (product.length === 0) return null;
  return product;
};

const updateSales = async ({ saleId, itemsUpdated }) => {
  const sale = await salesModel.getById(saleId);
  if (!sale.length) return { code: 404, message: 'Sale not found' };
  console.log(sale);
  const productNotFound = await itemsUpdated.reduce(async (acc, item) => {
    const product = await productsModel.getById(item.productId);
    if (!product) return true;
    return acc;
  }, false);
  if (productNotFound) return { code: 404, message: 'Product not found' };

  return salesModel.updateSales(saleId, itemsUpdated);
};

const deleteSales = async (id) => {
  try {
       const salesId = await salesModel.getById(id);
       if (salesId.length === 0) return null;
       await salesModel.deleteSales(id);
       return { ...salesId };
  } catch (error) {
    console.error(error);
    return ({ message: 'Server Error' });
  }
};

module.exports = {
  addSalesProducts,
  getAll,
  getById,
  updateSales,
  deleteSales,
};
