const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');
  return result;
};
const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ? ORDER BY id;',
    [id],
  );
  if (!result.length) return null;
  return result[0];
};
// getAll().then((result) => console.log(result));
module.exports = { getAll, getById };