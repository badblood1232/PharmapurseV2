import OrderService from '../service/order.service.js';

const OrderController = {
  addToCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { med_id, quantity } = req.body;

      if (!med_id) {
        return res.status(400).json({ message: 'Medicine id is required' });
      }

      const result = await OrderService.addToCart(userId, Number(med_id), Number(quantity));
      return res.status(200).json({ message: 'Added to cart', ...result });
    } catch (error) {
      console.log('ADD TO CART ERROR:', error);
      return res.status(400).json({ message: error.message || 'Failed to add to cart' });
    }
  },

  getMyCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await OrderService.getMyCart(userId);
      return res.status(200).json(cart);
    } catch (error) {
      console.log('GET CART ERROR:', error);
      return res.status(500).json({ message: 'Failed to load cart' });
    }
  },

  checkout: async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await OrderService.checkout(userId);
      return res.status(200).json({ message: 'Order placed', ...result });
    } catch (error) {
      console.log('CHECKOUT ERROR:', error);
      return res.status(400).json({ message: error.message || 'Failed to checkout' });
    }
  },

  getMyOrders: async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await OrderService.getMyOrders(userId);
      return res.status(200).json({ orders });
    } catch (error) {
      console.log('GET MY ORDERS ERROR:', error);
      return res.status(500).json({ message: 'Failed to load orders' });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await OrderService.getAllSubmittedOrders();
      return res.status(200).json({ orders });
    } catch (error) {
      console.log('GET ADMIN ORDERS ERROR:', error);
      return res.status(500).json({ message: 'Failed to load orders' });
    }
  },

  getOrderDetail: async (req, res) => {
    try {
      const order = await OrderService.getSubmittedOrderDetail(Number(req.params.orderId));

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      return res.status(200).json({ order });
    } catch (error) {
      console.log('GET ADMIN ORDER DETAIL ERROR:', error);
      return res.status(500).json({ message: 'Failed to load order' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const result = await OrderService.updateSubmittedOrderStatus(
        Number(req.params.orderId),
        req.body.status
      );
      return res.status(200).json({ message: 'Order status updated', ...result });
    } catch (error) {
      console.log('UPDATE ORDER STATUS ERROR:', error);
      return res.status(400).json({ message: error.message || 'Failed to update order status' });
    }
  },
};

export default OrderController;
