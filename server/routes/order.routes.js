import express from 'express';
import OrderController from '../controllers/order.controller.js';
import authMiddleware from '../middleware/Authmiddleware.js';

const router = express.Router();

router.post('/orders/cart/items', authMiddleware, OrderController.addToCart);
router.get('/orders/my-cart', authMiddleware, OrderController.getMyCart);

export default router;
