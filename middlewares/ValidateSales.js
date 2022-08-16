const salesValidations = (req, res, next) => {
  const sales = req.body;
  // const verifyProductId = 
  const productId = sales.filter((sale) => sale.productId);
  const quantity = sales.filter((sale) => sale.quantity);
  const quantityValue = sales.filter((sale) => sale.quantity <= 0);
  console.log(quantityValue);
  switch (true) {
    case productId.length !== sales.length:
      return res.status(400).json({ message: '"productId" is required' });
    case quantityValue.length > 0:
      return res.status(422).json({
        message: '"quantity" must be greater than or equal to 1',
      });
    case quantity.length !== sales.length:
      return res.status(400).json({ message: '"quantity" is required' });
    default:
      return next();
  }
};

module.exports = salesValidations;
