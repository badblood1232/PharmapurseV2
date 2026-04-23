import express from 'express';
import MedController from '../controllers/medicine.controller.js';

const router = express.Router();

router.get('/medicines', MedController.getAll);
router.get('/medicines/:id', MedController.getById);

export default router;
