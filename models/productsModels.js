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

const add = async (name) => {
  // [rows, defições da tabla]
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?);',
    [name],
  );
  return { id: result.insertId, name };
};

const update = async (name, id) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;', [name, id],
     );

  return result;
};

const exclude = async (id) =>
  connection.execute('DELETE FROM products WHERE id = ?;', [id]);

// getAll().then((result) => console.log(result)); teste do BD
module.exports = { getAll, getById, add, update, exclude };