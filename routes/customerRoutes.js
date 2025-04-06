import express from 'express';
import {
  createCustomer,
  getCustomer
} from '../controllers/customerController.js';

const router = express.Router();

// Create a new customer
router.post('/', createCustomer);

// Get customer by ID
router.get('/:id', getCustomer);

export default router;
