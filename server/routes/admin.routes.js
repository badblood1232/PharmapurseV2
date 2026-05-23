import express from 'express';
import OrderController from '../controllers/order.controller.js';
import authMiddleware from '../middleware/Authmiddleware.js';
import requireAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/admin/orders', authMiddleware, requireAdmin, OrderController.getAllOrders);
router.get('/admin/orders/:orderId', authMiddleware, requireAdmin, OrderController.getOrderDetail);
router.patch('/admin/orders/:orderId/status', authMiddleware, requireAdmin, OrderController.updateOrderStatus);

export default router;
