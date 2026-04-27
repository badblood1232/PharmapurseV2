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
};

export default Order;
