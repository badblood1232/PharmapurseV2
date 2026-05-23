import db from '../config/db.js';

const Order = {
  findPendingOrderByUserId: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1',
      [userId, 'pending']
    );
    return rows[0] || null;
  },

  createPendingOrder: async (userId) => {
    const [result] = await db.query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
      [userId, 0, 'pending']
    );
    return result.insertId;
  },

  findOrderItem: async (orderId, medId) => {
    const [rows] = await db.query(
      'SELECT * FROM order_items WHERE order_id = ? AND med_id = ? LIMIT 1',
      [orderId, medId]
    );
    return rows[0] || null;
  },

  createOrderItem: async (orderId, medId, quantity, unitPrice = 0) => {
    await db.query(
      'INSERT INTO order_items (order_id, med_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
      [orderId, medId, quantity, unitPrice]
    );
  },

  updateOrderItemQuantity: async (itemId, quantity) => {
    await db.query('UPDATE order_items SET quantity = ? WHERE item_id = ?', [quantity, itemId]);
  },

  updateOrderTotal: async (orderId) => {
    await db.query(
      `UPDATE orders 
       SET total_amount = (
         SELECT COALESCE(SUM(quantity * unit_price), 0)
         FROM order_items
         WHERE order_id = ?
       )
       WHERE order_id = ?`,
      [orderId, orderId]
    );
  },

  getPendingCartByUserId: async (userId) => {
    const [rows] = await db.query(
      `SELECT 
          o.order_id,
          o.total_amount,
          oi.item_id,
          oi.med_id,
          oi.quantity,
          oi.unit_price,
          m.name,
          m.details,
          m.image
        FROM orders o
        LEFT JOIN order_items oi ON oi.order_id = o.order_id
        LEFT JOIN medicine m ON m.med_id = oi.med_id
        WHERE o.user_id = ? AND o.status = ?
        ORDER BY oi.item_id ASC`,
      [userId, 'pending']
    );
    return rows;
  },

  checkoutPendingOrder: async (userId) => {
    const [result] = await db.query(
      `UPDATE orders
       SET status = ?
       WHERE user_id = ? AND status = ? AND order_id IN (
         SELECT order_id FROM order_items
       )`,
      ['placed', userId, 'pending']
    );
    return result.affectedRows;
  },

  getSubmittedOrdersByUserId: async (userId) => {
    const [rows] = await db.query(
      `SELECT order_id, total_amount, status, created_at
       FROM orders
       WHERE user_id = ? AND status <> ?
       ORDER BY created_at DESC`,
      [userId, 'pending']
    );
    return rows;
  },

  getAllSubmittedOrders: async () => {
    const [rows] = await db.query(
      `SELECT
          o.order_id,
          o.total_amount,
          o.status,
          o.created_at,
          u.id AS user_id,
          u.username,
          u.email
       FROM orders o
       JOIN users u ON u.id = o.user_id
       WHERE o.status <> ?
       ORDER BY o.created_at DESC`,
      ['pending']
    );
    return rows;
  },

  getSubmittedOrderDetail: async (orderId) => {
    const [rows] = await db.query(
      `SELECT
          o.order_id,
          o.total_amount,
          o.status,
          o.created_at,
          u.id AS user_id,
          u.username,
          u.email,
          oi.item_id,
          oi.med_id,
          oi.quantity,
          oi.unit_price,
          m.name,
          m.details,
          m.image
       FROM orders o
       JOIN users u ON u.id = o.user_id
       LEFT JOIN order_items oi ON oi.order_id = o.order_id
       LEFT JOIN medicine m ON m.med_id = oi.med_id
       WHERE o.order_id = ? AND o.status <> ?
       ORDER BY oi.item_id ASC`,
      [orderId, 'pending']
    );
    return rows;
  },

  updateSubmittedOrderStatus: async (orderId, status) => {
    const [result] = await db.query(
      'UPDATE orders SET status = ? WHERE order_id = ? AND status <> ?',
      [status, orderId, 'pending']
    );
    return result.affectedRows;
  },
};

export default Order;
