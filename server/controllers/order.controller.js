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
};

export default OrderController;
