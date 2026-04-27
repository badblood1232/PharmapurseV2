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
};

export default OrderService;
