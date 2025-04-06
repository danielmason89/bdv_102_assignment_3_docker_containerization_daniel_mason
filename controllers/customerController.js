import SiteUser from '../models/siteUserModel.js';
import bcrypt from 'bcrypt';

/**
 * POST /api/customers
 * Creates a new customer (user).
 */
export const createCustomer = async (req, res) => {
  try {
    const { email_address, phone_number, password } = req.body;

    // Simple input validation
    if (!email_address || !phone_number || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // (Optional) Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await SiteUser.create({
      email_address,
      phone_number,
      password: hashedPassword
    });

    // Return user info without the password
    return res.status(201).json({
      id: newUser.id,
      email_address: newUser.email_address,
      phone_number: newUser.phone_number
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/customers/:id
 * Fetches user info by ID.
 */
export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await SiteUser.findByPk(id, {
      attributes: ['id', 'email_address', 'phone_number'] // omit password
    });
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
