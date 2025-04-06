import express from 'express';
import { placeOrder, getOrder } from '../controllers/orderController.js';

const router = express.Router();

// Place a new order
router.post('/', placeOrder);

// Get an existing order by ID
router.get('/:id', getOrder);

export default router;
