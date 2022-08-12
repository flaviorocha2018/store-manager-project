const productService = require('../services/productService');

const ERROR_500 = 'Algo deu errado';

const getAll = async (_req, res, _next) => {
  try {
    const product = await productService.getAll();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};

const add = async (req, res) => {
  const { name } = req.body;
  try {
    const newProduct = await productService.add(name);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const product = await productService.update({ name, id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};

const exclude = async (req, res) => {
  try {
    const product = await productService.exclude(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};

module.exports = { getAll, getById, add, update, exclude };
