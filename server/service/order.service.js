import Order from '../models/order.model.js';
import Medicine from '../models/medicine.model.js';

const OrderService = {
  addToCart: async (userId, medId, quantity) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive integer');
    }

    const medicine = await Medicine.getById(medId);
    if (!medicine) {
      throw new Error('Medicine not found');
    }

    const unitPrice = Number(medicine.price);

    let pendingOrder = await Order.findPendingOrderByUserId(userId);
    let orderId = pendingOrder?.order_id;

    if (!orderId) {
      orderId = await Order.createPendingOrder(userId);
    }

    const existingItem = await Order.findOrderItem(orderId, medId);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;
      await Order.updateOrderItemQuantity(existingItem.item_id, updatedQuantity);
    } else {
      await Order.createOrderItem(orderId, medId, quantity, unitPrice);
    }

    await Order.updateOrderTotal(orderId);
    return { orderId };
  },

  getMyCart: async (userId) => {
    const rows = await Order.getPendingCartByUserId(userId);

    if (!rows.length) {
      return { orderId: null, totalAmount: 0, items: [] };
    }

    const orderId = rows[0].order_id;
    const totalAmount = Number(rows[0].total_amount || 0);
    const items = rows
      .filter((row) => row.item_id)
      .map((row) => ({
        item_id: row.item_id,
        med_id: row.med_id,
        name: row.name,
        details: row.details,
        image: row.image,
        quantity: row.quantity,
        unit_price: Number(row.unit_price || 0),
      }));

    return { orderId, totalAmount, items };
  },

  checkout: async (userId) => {
    const cart = await Order.getPendingCartByUserId(userId);
    const items = cart.filter((row) => row.item_id);

    if (!items.length) {
      throw new Error('Cart is empty');
    }

    const affectedRows = await Order.checkoutPendingOrder(userId);
    if (!affectedRows) {
      throw new Error('No pending cart found');
    }

    return { orderId: cart[0].order_id, status: 'placed' };
  },

  getMyOrders: async (userId) => {
    const rows = await Order.getSubmittedOrdersByUserId(userId);
    return rows.map((order) => ({
      order_id: order.order_id,
      total_amount: Number(order.total_amount || 0),
      status: order.status,
      created_at: order.created_at,
    }));
  },

  getAllSubmittedOrders: async () => {
    const rows = await Order.getAllSubmittedOrders();
    return rows.map((order) => ({
      order_id: order.order_id,
      total_amount: Number(order.total_amount || 0),
      status: order.status,
      created_at: order.created_at,
      user: {
        id: order.user_id,
        username: order.username,
        email: order.email,
      },
    }));
  },

  getSubmittedOrderDetail: async (orderId) => {
    const rows = await Order.getSubmittedOrderDetail(orderId);

    if (!rows.length) {
      return null;
    }

    const first = rows[0];
    return {
      order_id: first.order_id,
      total_amount: Number(first.total_amount || 0),
      status: first.status,
      created_at: first.created_at,
      user: {
        id: first.user_id,
        username: first.username,
        email: first.email,
      },
      items: rows
        .filter((row) => row.item_id)
        .map((row) => ({
          item_id: row.item_id,
          med_id: row.med_id,
          name: row.name,
          details: row.details,
          image: row.image,
          quantity: row.quantity,
          unit_price: Number(row.unit_price || 0),
        })),
    };
  },

  updateSubmittedOrderStatus: async (orderId, status) => {
    const allowedStatuses = ['placed', 'approved', 'rejected', 'completed'];

    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid order status');
    }

    const affectedRows = await Order.updateSubmittedOrderStatus(orderId, status);
    if (!affectedRows) {
      throw new Error('Order not found');
    }

    return { orderId, status };
  },
};

export default OrderService;
