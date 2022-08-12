const productModel = require('../models/productsModels');

const getAll = async () => productModel.getAll();
const getById = async (id) => productModel.getById(id);
const add = async (name) => productModel.add(name);

const update = async (product) => {
  const id = Number(product.id);
  const updated = await productModel.update(product.name, id);
  if (!updated.affectedRows) {
    return null;
  }
  return { ...product, id };
};

const exclude = async (id) => {
  const product = await productModel.getById(id);
  if (!product) return null;
  await productModel.exclude(id);
  return { ...product };
};

module.exports = { getAll, getById, add, update, exclude };