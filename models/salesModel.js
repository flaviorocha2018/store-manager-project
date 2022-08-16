const connection = require('./connection');

const addSales = async () => {
  const [result] = await connection.execute(
  'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return { id: result.insertId };
};

const addSalesProducts = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?,?,?)',
    [saleId, productId, quantity],
  );
  return { id: result.insertId };
};

const getAll = async () => {
  const [result] = await connection.execute(`SELECT sp.sale_id AS saleId, sales.date, 
      sp.product_id AS productId, sp.quantity
    FROM
      StoreManager.sales_products AS sp
    LEFT JOIN
      StoreManager.sales AS sales ON sp.product_id = sales.id
    ORDER BY
      sale_id , product_id;`);
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
      sales.date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      StoreManager.sales_products AS sp
    LEFT JOIN
      StoreManager.sales AS sales ON sp.product_id = sales.id
    WHERE
      sale_id = ?;`,
    [id],
  );
  return result;
};

const updateSales = async (saleId, itemsUpdated) => {
  await Promise.all(itemsUpdated.map(async (item) => {
    await connection.execute(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
      [item.quantity, saleId, item.productId],
    );
  }));

  const saleUpdated = {
    saleId,
    itemsUpdated,
  };
  return saleUpdated;
};

const deleteSales = async (id) => {
  const deleteSale = 'DELETE FROM StoreManager.sales WHERE id = ?;';
  const deleteSalesProducts = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;';
  const [salesDeleted] = await connection.execute(deleteSale, [id]);
  await connection.execute(deleteSalesProducts, [id]);
  if (salesDeleted.affectedRows === 0) return false;
  return true;
};

module.exports = {
  addSales,
  addSalesProducts,
  getAll,
  getById,
  updateSales,
  deleteSales,
};
