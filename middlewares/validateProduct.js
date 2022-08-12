const NAME_REQUIRED_ERROR = { message: '"name" is required' };
const NAME_LENGTH_ERROR = {
  message: '"name" length must be at least 5 characters long',
};
const ERROR_500 = { message: 'Server Error' };

const validateProduct = async (req, res, next) => {
   try {
     const { name } = req.body;
     if (!name) return res.status(400).json(NAME_REQUIRED_ERROR);
     if (name.length < 5) return res.status(422).json(NAME_LENGTH_ERROR);
     next();
   } catch (error) {
     console.error(error);
     return res.status(500).json({ message: ERROR_500 });
   }
};

module.exports = validateProduct;
